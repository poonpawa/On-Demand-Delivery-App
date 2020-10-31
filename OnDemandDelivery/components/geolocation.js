import React, { useState, useEffect } from 'react'
import { View, StyleSheet, PermissionsAndroid, Image, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import UserService from "../services/user-service";

const geolocation = () => {
    Geocoder.init('AIzaSyDruW1y-7dgxRELw_-6yaWDnoFFNEooobo', { language: "en" });
    const [Location, setLocation] = useState()
    const [address, setAddress] = useState()

    useEffect(() => {
        
          
        UserService().AddData('Address', address)
    }, [address])

    const getLocation = async () => {

        //const requestLocationPermission = async () => {
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
                            }
                        );
                    },
                    error => Alert.alert(error.message),
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 1000,
                        distanceFilter: 1 //for 1metre accuracy
                    }
                );
              } else {
                console.log("Location permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
          //};

        
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
            {/* <Button title="Get Device Location" buttonStyle={styles.btn} onPress={() => getLocation()} />
            <Text style={styles.textContainer}>{address}</Text> */}
            
                <TouchableOpacity onPress={() => getLocation()}>
                    <Text style={styles.textlocation}>Get location <Image 
                        style={styles.textImage}
                        source={require('../assets/Images/gps.png')} /></Text>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    location: {
        paddingTop: 8,
    },
    textlocation: {
        color: '#C75300', 
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
    },
    textImage: {
        marginLeft: 12,
    }
})




export default geolocation
