import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { OrderService } from '../services/order-service'
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import UserService from '../services/user-service'
import { Right } from 'native-base'
import { BackHandler } from "react-native";
import { CommonActions } from '@react-navigation/native';


const tracking = (props) => {
    let orderId = props.route.params.orderId
    const [data, setData] = useState(null)
    const [riderStatus, setriderStatus] = useState()
    const [buyerLocation, setbuyerLocation] = useState(null)
    const [riderLocation, setriderLocation] = useState(null)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            async () => { 
                props.navigation.dispatch( 
                    CommonActions.navigate(
                    'Home', {screen: 'Order'}
                  ));
            }
        );
        
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
            backHandler.remove();
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
                        <View style={styles.timeline}>
                            <Text style={styles.timelineOrderId}>Order Id: {orderId}</Text>
                            <View style={{height: 1, backgroundColor: '#ECECF6'}}></View>
                            <View style={styles.timelineStatus}>
                                <Text style={styles.timelineStatusRider}>{riderStatus}</Text>
                                <Text style={styles.timelineLocation}><Text style={{fontFamily: "NunitoSans-Bold"}}>{data.riderName}</Text> is on the way to <Text style={{fontFamily: "NunitoSans-Bold"}}>{data.store}</Text></Text>
                            </View>
                            <View style={{backgroundColor: '#F3F3F3', height: 8}}></View>
                            <View style={styles.timelineFooter}>
                                <Text style={styles.timelinePrice}>Total Price:</Text>
                                <Text style={styles.timelinePay}>Cash on delivery</Text>    
                            </View>
                        </View>
                    </View>
                   
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
    timelineOrderId: {
        color: '#383F51',
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 12,
        marginBottom: 12,
        paddingLeft: 16,
    },
    timelineStatus: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    timelineStatusRider: {
        color: '#383F51',
        fontSize: 18,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 8, 
    },
    timelineLocation: {
        color: '#6A748A',
        fontSize: 15,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 8,
        marginBottom: 12,
    },  
    timeline: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      backgroundColor: 'white',
    },
    timelineFooter:{
        width: '90%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 12,
        marginBottom: 12,
    },
    timelinePrice: {
        color: '#383F51',
        fontSize: 15,
        fontFamily: "NunitoSans-SemiBold",
    },
    timelinePay: {
        color: '#383F51',
        fontSize: 15,
        fontFamily: "NunitoSans-SemiBold",
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 600,
        width: 450,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default tracking;


