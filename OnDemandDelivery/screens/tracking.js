import React from 'react'
import { StyleSheet, View, Dimensions, Image, Linking, BackHandler } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { OrderService } from '../services/order-service'
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import UserService from '../services/user-service'
import { CommonActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
                props.navigation.navigate('Delivered', {orderId: orderId})
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
                            <View style={styles.callPhone}>
                                <Text style={styles.timelineOrderId}>Rider: <Text style={styles.timelineOrderId}>{data.riderName}</Text></Text>
                                <TouchableOpacity onPress={() => {
                                    Linking.openURL(`tel:${data.riderPhone}`)
                                }}>
                                    <Image 
                                        style={styles.textImage}
                                        source={require('../assets/Images/Call.jpeg')} />
                                </TouchableOpacity>
                            </View>
                           {/*  <Button title="Call" buttonStyle={styles.btn} onPress={() => {
                                Linking.openURL(`tel:${data.riderPhone}`)
                            }} /> */}
                            <View style={{height: 1, backgroundColor: '#ECECF6'}}></View>
                            <View style={styles.timelineStatus}>
                                <Text style={styles.timelineStatusRider}>{riderStatus}</Text>
                                {(riderStatus === 'Rider Assigned')? <View>
                                    <Text style={styles.timelineLocation}><Text style={{fontFamily: "NunitoSans-Bold"}}>{data.riderName}
                                    </Text> is on the way to <Text style={{fontFamily: "NunitoSans-Bold"}}>{data.store}</Text></Text>
                                </View> 
                                : (riderStatus === 'Rider is at the store')? <View>
                                    <Text style={styles.timelineLocation}><Text style={{fontFamily: "NunitoSans-Bold"}}>{data.riderName}
                                    </Text> is picking your items from <Text style={{fontFamily: "NunitoSans-Bold"}}>{data.store}</Text></Text>
                                </View> : 
                                <View>
                                <Text style={styles.timelineLocation}><Text style={{fontFamily: "NunitoSans-Bold"}}>{data.riderName}
                                    </Text> has picked the order</Text>
                                </View>}

                                
                            </View>
                            <View style={{backgroundColor: '#F3F3F3', height: 8}}></View>
                            <View style={styles.timelineFooter}>
                                <Text style={styles.timelinePrice}>Total Price: € {data.totalPrice} </Text>
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        height: windowHeight,
        width: windowWidth,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    callPhone: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 16,
    },
    timelineOrderId: {
        color: '#383F51',
        fontSize: 15,
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
        fontFamily: "NunitoSans-Bold",
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
      bottom: 80,
      backgroundColor: 'white',
    },
    timelineFooter:{
        width: '100%',
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
    btn: {
        width: 50,
        height: 30
    }
})

export default tracking;


