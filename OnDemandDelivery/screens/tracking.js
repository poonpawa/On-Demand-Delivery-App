import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { OrderService } from '../services/order-service'
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import UserService from '../services/user-service'

const tracking = (props) => {
    let orderId = props.route.params.orderId
    const [data, setData] = useState(null)
    const [riderStatus, setriderStatus] = useState()
    const [buyerLocation, setbuyerLocation] = useState(null)
    const [riderLocation, setriderLocation] = useState(null)
    useEffect(() => {
        OrderService().getOrderData(orderId).then((DBdata) => {
            setData(DBdata)
            setriderStatus(DBdata.riderStatus.status)
            const locationSubscribe = firestore().collection("Riders").doc(DBdata.riderId).onSnapshot((doc) => {
                setriderLocation(doc.data()["Location"])
            })
        })

        UserService().getValue('Location').then((location) => {
            console.log(location);
            setbuyerLocation(location)
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
                        {buyerLocation && riderLocation ?
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: buyerLocation.latitude,
                                    longitude: buyerLocation.longitude,
                                    latitudeDelta: 0.012,
                                    longitudeDelta: 0.011,
                                }}>
                                <Marker
                                    coordinate={{ latitude: buyerLocation.latitude, longitude: buyerLocation.longitude }}
                                    title="buyer"
                                    image={require('../assets/Icons/Buyer_marker.png')}
                                />
                                <Marker
                                    coordinate={{ latitude: riderLocation.latitude, longitude: riderLocation.longitude }}
                                    title="Rider"
                                    image={require('../assets/Icons/Rider_marker.png')}
                                />
                            </MapView> : null

                        }

                    </View>
                    <Text>Order Id: {orderId}</Text>
                    <Text>{riderStatus}</Text>
                    <Text>{data.riderName} is on the way to {data.store}</Text>
                    <Text>Total Price</Text>
                </View>
                : null
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 650,
        width: 450,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default tracking;


