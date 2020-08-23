import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { OrderService } from '../services/order-service'
import firestore from '@react-native-firebase/firestore';
import MapView from 'react-native-maps';

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
        <View >
            {data ?
                <View style={styles.container}>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    </View>
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
        flex: 1
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 500,
        width: 450,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default tracking;


