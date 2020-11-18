import React from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import * as geolib from 'geolib';
import RiderService from "../services/rider-service";
import UserService from "../services/user-service";
import NotificationTokenService from "../services/notification-token-service";
import * as _ from 'lodash';
import { connect } from 'react-redux';

const placeOrder = (props) => {
    console.log('props placeorder', props)
    const navigate = props.navigation;
    return (
        <View>
            <Button title="Place Order" onPress={() => assignRider(navigate, props.store, props)} buttonStyle={props.btnStyle} />
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
const findNearestRiders = async () => {
    let nearestRiders = [];
    let riderTokens = [];
    let currentLocation = await UserService().getValue('Location');
    let querySnapshot = await RiderService().getAvailableRiders()

    querySnapshot.forEach(function (doc) {
        //if (geolib.isPointWithinRadius(convertGeopoint(doc.data()['Location']), convertGeopoint(currentLocation), 2000)) {
        const locationCoords = convertGeopoint(doc.data()['Location'])
        nearestRiders.push(
            locationCoords
        )

        riderTokens.push({
            location: locationCoords,
            token: doc.data()['NotificationTokens']
        })
        //}
    })

    let riderCoordinates = geolib.findNearest(convertGeopoint(currentLocation), nearestRiders);
    return _.find(riderTokens, { location: riderCoordinates }).token
}

const assignRider = (navigate, store, props) => {
    findNearestRiders().then(
        (riderToken) => {
            NotificationTokenService().sendOrderRequestToRiders(riderToken, Math.random().toString(10).substr(2, 7), store, props)
                .then((rider) => {
                    navigate('RiderWait')

                })
        }
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price,
        state: state.store
    }
}


const styles = StyleSheet.create({})


export default connect(mapStateToProps)(placeOrder)
