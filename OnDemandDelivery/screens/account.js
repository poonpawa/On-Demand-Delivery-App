import React, { useState, useEffect } from 'react'
import { RecyclerViewBackedScrollViewComponent, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderService } from '../services/order-service'
import firebase from "@react-native-firebase/app"
import { ListItem, Button, Text } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const account = (props) => {
    const [orders, setOrders] = useState([])
    const [currentOrderId, setcurrentOrderId] = useState(null)
    const [activeOrderDetails, setactiveOrderDetails] = useState(null)
    const navigate = props.navigation;
    const isFocused = useIsFocused();
    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
       AsyncStorage.getItem('orderId').then((id) => setcurrentOrderId(id));
        OrderService().getAllOrders(userId).then((data) => {
            setOrders(data)
            setactiveOrderDetails(orders.find((item) => item.id === currentOrderId))
        })
    }, [isFocused])

    const signOut = (navigate) => {
        auth().signOut()
            .then(() => {
                console.log('User signed out!')
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        key: null,
                        routes: [{name: 'Login'}]
                    })
                )
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
                        titleStyle={{ color: '#6A748A', fontFamily: "NunitoSans-SemiBold",fontSize: 15 }}
                        onPress={() => { signOut(props.navigation.navigate) }}
                    />
                </View>
                    <View>
                
                        {activeOrderDetails? 
                            <View>
                                <Text style={styles.head}>CURRENT ORDERS</Text>
                                <View style={styles.previousContainer}>
                                    <View style={styles.eachOrder}>
                                        <Text style={styles.firstTitle}>Order Id: {activeOrderDetails.id}</Text>
                                        <Text style={styles.secondTitle}>Store: {activeOrderDetails.store}</Text>
                                        <Text style={styles.lastTitle}>Amount Paid: {activeOrderDetails.totalPrice} Euro</Text>
                                    </View>
                                    
                                    <View>
                                        <Button title="ViewDetails" buttonStyle={styles.btn} onPress={() => {
                                            props.navigation.navigate('Tracking', {orderId: currentOrderId})
                                        }} />
                                    </View> 
                                </View>
                            </View>
                            : null }
                    
                </View>

                <Text style={styles.head}>ORDERS</Text>
                <View>
                    {
                        orders.map((item, key) => (
                            <View key={key} style={styles.previousContainer}>
                                <View style={styles.eachOrder}>
                                    <Text style={styles.firstTitle}>Order Id: {item.id}</Text>
                                    <Text style={styles.secondTitle}>Store: {item.store}</Text>
                                    <Text style={styles.lastTitle}>Amount Paid: {item.totalPrice} Euro</Text>
                                </View>
                                {(item.id === currentOrderId) ? 
                                <View>
                                    <Button title="ViewDetails" buttonStyle={styles.btn} onPress={() => {
                                        props.navigation.navigate('Tracking', {orderId: currentOrderId})
                                    }} />
                                </View> : null}
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        height: '100%'
    },
    fixHead: {
        color: '#383F51',
        textAlign: 'center',
        fontFamily: "NunitoSans-Bold",
        fontSize: 20,
        height: 60,
        lineHeight: 60,
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: 1,
        backgroundColor: 'white'
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
