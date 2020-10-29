import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import UserService from '../services/user-service';
import { OrderService } from "../services/order-service";
import { connect } from 'react-redux';

const riderWait = (props) => {
    const { navigate } = props.navigation;
    useEffect(() => {

        /* const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                navigate.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Menu' })
                    ]
                })
            }
        ); */
        messaging().onMessage((payload) => {
            if (payload.data.response) {
                let productData = {
                    totalPrice: props.price,
                    products: props.products
                }
                let orderDetails = { ...productData, ...JSON.parse(payload.data.orderDetails) }
                let orderId = payload.data.orderNumber
                UserService().AddData('orderID', orderId)
                OrderService().createOrderCollection(orderId, orderDetails, payload.data).then(() => {
                    navigate('Tracking', { orderId })
                })

            } else {
                console.log('Order Rejected');
            }
        });
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#C75300"></ActivityIndicator>
            <Text style={styles.waitingText}>Waiting for the rider to accept the order</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
    },
    waitingText: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: 18,
        color: '#383F51',
        marginTop: 16
    }
})

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price
    }
}
export default connect(mapStateToProps)(riderWait);
