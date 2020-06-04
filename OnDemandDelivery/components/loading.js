import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from '@react-native-firebase/app';


const loading = (props) => {
    const { navigate } = props.navigation
    useEffect(() => {
        firebase.auth().onAuthStateChanged(User => {
            navigate(User ? "App" : "Auth");
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default loading;
