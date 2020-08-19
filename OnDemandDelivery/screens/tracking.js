import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { OrderService } from '../services/order-service'
import firestore from '@react-native-firebase/firestore';

const tracking = (props) => {
    let orderId = props.route.params.orderId
    const [data, setData] = useState(null)
    const [riderStatus, setriderStatus] = useState()
    useEffect(() => {
        OrderService().getOrderData(orderId).then((DBdata) => {
            setData(DBdata)
            setriderStatus(DBdata.riderStatus.status)
        })

        const unsubscribe = firestore().collection("Orders").doc(orderId).onSnapshot((doc) => {
            let status = doc.get('riderStatus.status')
            setriderStatus(status)
            if (status === 'Order Delivered') {
                props.navigation.navigate('Delivered')
            }
        });

        return () => {
            unsubscribe();
        }

    }, [])

    return (
        <View style={styles.container}>
            {data ?
                <View>
                    <Text>Order Id: {orderId}</Text>
                    <Text>{riderStatus}</Text>
                    <Text>{data.riderName} is on the way to {data.store}</Text>
                    <Text>Total Price</Text>
                </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default tracking;


