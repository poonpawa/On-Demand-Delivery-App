import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const loading = (props) => {
    const { navigate } = props.navigation

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (user) {
        navigate("App");
    } else {
        navigate("Splash");
    }


    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
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
