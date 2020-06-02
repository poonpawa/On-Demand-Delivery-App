import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const loading = () => {
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
