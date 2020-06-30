import React from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import * as geolib from 'geolib';
import RiderService from "../services/rider-service";
import UserService from "../services/user-service";

const placeOrder = () => {
    return (
        <View>
            <Button title="Place Order" onPress={() => assignRider()} buttonStyle={styles.btn} />
        </View>
    )
}
//converting the firestore geopoint into object (latitude, longitude)
const convertGeopoint = (geopointObj) => {
    return {
        latitude: geopointObj.latitude,
        longitude: geopointObj.longitude
    }
}

//find all the available riders within 2Km radius
const findNearestRiders = () => {
    let nearestRiders = [];
    UserService().getValue('Location').then((currentLocation) => {
        RiderService().getAvailableRiders()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    if (geolib.isPointWithinRadius(convertGeopoint(doc.data()['Location']), convertGeopoint(currentLocation), 2000)) {
                        nearestRiders.push(doc.id)
                    }
                })
                return nearestRiders;
            })
    })
}


const assignRider = () => {
    findNearestRiders()
}


const styles = StyleSheet.create({})

export default placeOrder
