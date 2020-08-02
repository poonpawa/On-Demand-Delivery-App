import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const riderWait = (props) => {
    const { navigate } = props.navigation;
    useEffect(() => {
        messaging().onMessage((payload) => {
            if (payload.data.response) {
                console.log('Order Confirmed')
                navigate('Tracking')
            } else {
                console.log('Order Rejected');
            }
        });

    }, [])
    return (
        <View style={styles.container}>
            <Text>Waiting for Rider to accept the order</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    )
}

export default riderWait

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
