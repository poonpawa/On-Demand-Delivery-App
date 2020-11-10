import messaging from '@react-native-firebase/messaging';
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
import UserService from "../services/user-service";


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
                NotificationTokens: token,
            });
    }

    const sendOrderRequestToRiders = async (listOfRiders, orderNo, store) => {
        const URL = 'https://fcm.googleapis.com/fcm/send'

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAA3XEoy8g:APA91bEmvcXQWmQc0P_0soiyVPu5SDjLGDTy6gzToQxcyF5yXMEEiAzFArYTNJlYkOHiRKkc9GV1NKg9fjCl8EY9ZBBQrL_27368oblCJdej3zjxbJ960BAB2Gzumtt3F-WSgvI2GiR4'
        })

        const details = await UserService().getBuyerDetails();

        console.log(details);
        const message = {
            to: listOfRiders,
            data: {
                orderNumber: orderNo,
                time: new Date().toLocaleTimeString(),
                buyer: {
                    address: details.Address,
                    token: details.NotificationTokens,
                    location: details.Location
                },
                number: '987889746',
                store: store,
            },
            priority: 'high',
            notification: {
                title: 'Order Available',
                body: 'Would you like to accept the order?',
                click_action: 'OPEN'
            }
        }

        return await fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(message)
        })
    }

    return { getTokenAndStore, saveTokenToDatabase, sendOrderRequestToRiders }
}

export default NotificationTokenService

