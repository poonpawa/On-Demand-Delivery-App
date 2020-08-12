import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';

export const OrderService = (props) => {
    const createOrderCollection = async (orderId, orderdata, data) => {
        let orderDbData = await firestore().collection('Orders').doc(orderId).get();
        //check wheather the order data already exits
        if (!orderDbData.exists) {
            firestore().collection('Orders').doc(orderId).set({
                id: orderdata.orderNumber,
                shippingAddress: orderdata.address,
                store: orderdata.store,
                riderStatus: {
                    status: 'Rider Assigned',
                    timeUpdated: orderdata.time
                },
                riderToken: data.riderToken,
                buyerToken: data.buyerToken,
                riderName: data.riderName,
                //products: props.products,
                //totalPrice: props.price, 
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

    return {
        createOrderCollection, getOrderData
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price
    }
}
export default connect(mapStateToProps)(OrderService);

