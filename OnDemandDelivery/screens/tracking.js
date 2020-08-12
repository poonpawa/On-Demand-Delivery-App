import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { OrderService } from '../services/order-service'

const tracking = ({ navigation, route }) => {
    let orderId = route.params.orderId
    const [data, setData] = useState(null)
    useEffect(() => {
        OrderService().getOrderData(orderId).then((DBdata) => {
            setData(DBdata)
            console.log(DBdata);
        })
    }, [])


    return (
        <View style={styles.container}>
            {data ?
                <View>
                    <Text>Order Id: {orderId}</Text>
                    <Text>{data.riderStatus.status}</Text>
                    <Text>{data.riderName} is on the way to {data.store}</Text>
                    <Text>Total Price</Text>
                </View>
                : null
            }
        </View>
    )
}

export default tracking

const styles = StyleSheet.create({
    container: {

    }
})
