import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const delivered = (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Icons/OrderDelivered.png')}
                style={{ width: 100, height: 100 }}
            />
            <Text style={styles.title}>Order Delivered</Text>
            <Text>Your Order was Delivered</Text>
            <Text style={styles.linkText} onPress={() => props.navigation.navigate('Home')}>Deliver another order</Text>
        </View>
    )
}

export default delivered

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: 'NunitoSans-SemiBold'
    },
    linkText: {
        color: '#C75300'
    }
})
