import React, { useState, useEffect } from 'react'
import { View, StyleSheet, PermissionsAndroid, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Button, Text } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import UserService from "../services/user-service";

const geolocation = (props) => {
    Geocoder.init('AIzaSyDruW1y-7dgxRELw_-6yaWDnoFFNEooobo', { language: "en" });
    const [Location, setLocation] = useState()
    const [address, setAddress] = useState()
    const [loading, setloading] = useState(false)

    useEffect(() => { 
        UserService().AddData('Address', address)
    }, [address])

    const sendDataToParent = () => {
        props.parentCallback(!loading)
    }

    const getLocation = async () => {
            setloading(true)
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await Geolocation.watchPosition(
                    position => {
                        setLocation(position);
                        getAddress(position.coords.latitude, position.coords.longitude).then(
                            () => {
                                UserService().UpdateLocation(position.coords)
                                setloading(false)
                                sendDataToParent()
                            }
                        );
                    },
                    error => Alert.alert(error.message),
                    {
                        enableHighAccuracy: false,
                        timeout: 20000,
                        maximumAge: 1000
                        //distanceFilter: 1 //for 1metre accuracy
                    }
                );
              } else {
                console.log("Location permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
    };

    const getAddress = (lat, lng) => {
        return Geocoder.from(lat, lng).
            then(
                (jsonData) => {
                    setAddress(jsonData.results[0].formatted_address);
                },
                (err) => {
                    console.error(err);
                });
    }

    return (
        <View style={styles.location}>
            
                <TouchableOpacity onPress={() => getLocation()}>
                    <Text style={styles.textlocation}>Get location <Image 
                        style={styles.textImage}
                        source={require('../assets/Images/gps.png')} /></Text>
                </TouchableOpacity>

                {loading ? 
                <View style={styles.locationValue}>
                    <ActivityIndicator size="large" color='#C75300' />
                </View> : 
                <View>
                    <Text style={styles.locationValue}>{address}</Text>
                </View>}
               
        </View>
    )
}
const styles = StyleSheet.create({
    location: {
        paddingTop: 8,
        height: 70
    },
    locationValue: {
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 24,
        color: '#383F51', 
    },
    textlocation: {
        color: '#C75300', 
        fontSize: 20,
        fontFamily: "NunitoSans-SemiBold",
    },
    textImage: {
        marginLeft: 12,
    }
})

export default geolocation
