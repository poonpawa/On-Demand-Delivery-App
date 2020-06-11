import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import Geolocation from "../components/geolocation";

const home = (props) => {
    let useObj = {};
    const { navigate } = props.navigation;
    const displayName = firebase.auth().currentUser.displayName;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Welcome {displayName}</Text>
            <Geolocation />
            <Button title="Sign-Out" buttonStyle={styles.btn} onPress={() => {
                signOut(navigate)
            }} />
        </View>
    )
}

const signOut = (navigate) => {
    firebase.auth().signOut()
        .then(() => {
            console.log('User signed out!')
            navigate('Auth')
        });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 30
    },
    btn: {
        width: 100,
        color: "#333334",
        marginTop: 40
    }
})

export default home
