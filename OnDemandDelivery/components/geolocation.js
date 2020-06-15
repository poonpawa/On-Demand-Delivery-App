import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import UserService from "../services/user-service";

const geolocation = () => {
    Geocoder.init('AIzaSyDruW1y-7dgxRELw_-6yaWDnoFFNEooobo', { language: "en" });
    const [Location, setLocation] = useState()
    const [address, setAddress] = useState()

    useEffect(() => UserService().AddData('Address', address), [address])

    const getLocation = async () => {
        await Geolocation.watchPosition(
            position => {
                setLocation(position);
                getAddress(position.coords.latitude, position.coords.longitude).then(
                    (data) => {
                        UserService().UpdateLocation(position.coords)
                    }
                );
            },
            error => Alert.alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1 //for frequent update accuracy
            }
        );
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
        <View>
            <Button title="Get Device Location" onPress={() => getLocation()} />
            <Text>{address}</Text>
        </View>
    )
}



export default geolocation
