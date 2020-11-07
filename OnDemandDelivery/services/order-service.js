import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app";

export const OrderService = (props) => {
    const createOrderCollection = async (orderId, orderdata, data) => {
        console.log(props);
        let orderDbData = await firestore().collection('Orders').doc(orderId).get();
        let buyerId = firebase.auth().currentUser.uid;
        let orderData = JSON.parse(orderdata.buyer);

        //check wheather the order data already exits
        if (!orderDbData.exists) {
            return await firestore().collection('Orders').doc(orderId).set({
                id: orderdata.orderNumber,
                shippingAddress: orderData.address,
                store: orderdata.store,
                riderStatus: {
                    status: 'Rider Assigned',
                    timeUpdated: orderdata.time
                },
                destination: data.buyerLocation,
                riderToken: data.riderToken,
                riderId: data.riderId,
                buyerId: buyerId,
                buyerToken: data.buyerToken,
                riderName: data.riderName,
                products: orderdata.products,
                totalPrice: orderdata.totalPrice,
                active: true
            })
        }
    }

    const getOrderData = async (orderId) => {
        let data;
        await firestore().collection('Orders').doc(orderId).get().then((doc) => {
            data = doc.data();
        })
        return data;
    }

    const getAllOrders = async (buyerId) => {
        let allOrders = [];
        await firestore().collection('Orders').where('buyerId', '==', buyerId).get().then((doc) => {
            doc.forEach(item => {
                allOrders.push(item.data())
            });
        })
        return allOrders
    }

    return {
        createOrderCollection, getOrderData, getAllOrders
    }


}

/* const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price
    }
}
export default (OrderService); */

