import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const geolocation = () => {
    Geocoder.init('AIzaSyDruW1y-7dgxRELw_-6yaWDnoFFNEooobo', { language: "en" });
    const [Location, setLocation] = useState()
    const [address, setAddress] = useState(null)

    const getLocation = async () => {
        await Geolocation.getCurrentPosition(
            position => {
                setLocation(position);
                console.log(Location);
                getAddress(position.coords.latitude, position.coords.longitude);
            },
            error => Alert.alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );


    };

    const getAddress = (lat, lng) => {
        Geocoder.from(lat, lng).
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
