import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
import React, { useState, useRef } from 'react'

const UserService = () => {
    const userId = firebase.auth().currentUser.uid;

    //for creating initial user entry
    const AddUserDetails = (userData) => {
        const { name, email } = userData;
        firestore().collection('Buyers').doc(userId).set({
            Name: name,
            Email: email
        })
    }

    //for real time buyers location update
    const UpdateLocation = (value) => {
        const collRef = firestore().collection('Buyers').doc(userId)

        collRef.update({
            Location: new firestore.GeoPoint(value.latitude, value.longitude)
        })
    }

    //To add values in Buyers collection
    const AddData = (key, value) => {
        if (value) {
            const dbReference = firestore().collection('Buyers').doc(userId)

            let data = {}
            data[key] = value
            dbReference.update(data)
        }
    }

    return {
        AddUserDetails, UpdateLocation, AddData
    }
}

export default UserService