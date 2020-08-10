import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import UserService from '../services/user-service';
import { OrderService } from "../services/order-service";

const riderWait = (props) => {
    const { navigate } = props.navigation;
    useEffect(() => {
        messaging().onMessage((payload) => {
            if (payload.data.response) {
                let orderDetails = JSON.parse(payload.data.orderDetails)
                UserService().AddData('orderId', payload.data.orderNumber)
                OrderService().createOrderCollection(payload.data.orderNumber, orderDetails, payload.data)
                navigate('Tracking')
            } else {
                console.log('Order Rejected');
            }
        });

    }, [])
    return (
        <View style={styles.container}>
            <Text>Waiting for Rider to accept the order</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    )
}

export default riderWait

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
