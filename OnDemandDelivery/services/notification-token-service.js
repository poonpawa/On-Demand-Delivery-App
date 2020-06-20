import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';

const NotificationTokenService = () => {

    // Get the device token
    const getTokenAndStore = () => {
        messaging()
            .getToken()
            .then(token => {
                return saveTokenToDatabase(token);
            });
    }

    const saveTokenToDatabase = (token) => {
        // Assume user is already signed in
        const userId = firebase.auth().currentUser.uid;

        // Add the token to the users datastore
        return firestore()
            .collection('Buyers')
            .doc(userId)
            .update({
                NotificationTokens: firestore.FieldValue.arrayUnion(token),  //a user can be logged in from multiple devices
            });
    }

    return { getTokenAndStore, saveTokenToDatabase }
}

export default NotificationTokenService

