import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const delivered = () => {
    return (
        <View style={styles.container}>
            <Text>delivered</Text>
        </View>
    )
}

export default delivered

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
