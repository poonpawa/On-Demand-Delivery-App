import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderService } from '../services/order-service'
import firebase from "@react-native-firebase/app"
import { ListItem, Button, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth';

const account = (props) => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        OrderService().getAllOrders(userId).then((data) => {
            setOrders(data)
        })
    })

    const signOut = (navigate) => {
        auth().signOut()
            .then(() => {
                console.log('User signed out!')
                navigate('Auth')
            });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.fixHead}>Account</Text>
            <ScrollView>
                <Text style={styles.head}>ACCOUNT</Text>
                <View>
                    <ListItem
                        title={'Logout'}
                        titleStyle={{ color: '#6A748A', fontFamily: "NunitoSans-SemiBold",fontSize: 15, }}
                        onPress={() => { signOut(props.navigation.navigate) }}
                    />
                </View>
                <Text style={styles.head}>PREVIOUS ORDERS</Text>
                <View>
                    {
                        orders.map((item, key) => (

                            <View key={key} style={styles.previousContainer}>
                                <View style={styles.eachOrder}>
                                    <Text style={styles.firstTitle}>
                                        Order Id: <Text>{item.id}</Text>
                                    </Text>
                                    <Text style={styles.secondTitle}>
                                        Store: <Text>{item.store}</Text>
                                    </Text>
                                    <Text style={styles.lastTitle}>
                                        Amount Paid: <Text>{item.totalPrice} Euro</Text>
                                    </Text>
                                </View>
                            </View>

                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    fixHead: {
        color: '#383F51',
        textAlign: 'center',
        fontFamily: "NunitoSans-Bold",
        fontSize: 18,
        height: 60,
        lineHeight: 60,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: '#FAFAFA',
        height: '100%'
    },
    previousContainer: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16
    },
    head: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 14,
        marginTop: 12,
        marginBottom: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    firstTitle: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 15,
        marginTop: 12,
    },
    secondTitle: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 15,
        marginTop: 8
    },
    lastTitle: {
        color: '#6A748A',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 15,
        marginTop: 8,
        marginBottom: 16,
    },
    eachOrder: {
        borderBottomColor: '#ECECF6',
        borderBottomWidth: 1,   
    }
})

export default account
