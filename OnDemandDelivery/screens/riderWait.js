import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import UserService from '../services/user-service';
import { OrderService } from "../services/order-service";
import { connect } from 'react-redux';
import { BackHandler } from "react-native";
import { Button } from 'react-native-elements';
import { useIsFocused, useNavigationState, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const riderWait = (props) => {
    const { navigate } = props.navigation;
    const [timePassed, settimePassed] = useState(false)
    const isFocused = useIsFocused();
    setTimeout(() => {settimePassed(true)}, 15000)
    
    useEffect(() => {   
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            async () => { 
                BackHandler.exitApp();
                return true;
            }
        );

        
        messaging().onMessage((payload) => {
            settimePassed(false);
            if (payload.data.response) {
                let productData = {
                    totalPrice: props.price,
                    products: props.products
                }
                let orderDetails = { ...productData, ...JSON.parse(payload.data.orderDetails) }
                let orderId = payload.data.orderNumber
                UserService().AddData('orderID', orderId)
                AsyncStorage.setItem('orderId', orderId);
                OrderService().createOrderCollection(orderId, orderDetails, payload.data).then(() => {
                    navigate('Tracking', { orderId })
                })  
            } else {
                console.log('Order Rejected');
            }
        });


        return () => {
            backHandler.remove();
        }
    }, [isFocused])


    return (
        <View style={styles.container}>
        {!timePassed? 
        
            <View>
                <ActivityIndicator size="large" color="#C75300"></ActivityIndicator>
                <Text style={styles.waitingText}>Waiting for the rider to accept the order</Text>
            </View>
         : <View style={styles.insideContainer}>
                <Text style={styles.textone}>Rider Unavailable</Text>
                <Text style={styles.waitingText}>Try again after sometime</Text>
                <Button title="Go Back" onPress={() => navigate('Home')} buttonStyle={styles.primarybtn} />
         </View>}
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    textone: {
        color: '#C75300', 
        fontSize: 30,
        fontFamily: "NunitoSans-SemiBold",
    },
    texttwo: { 
        fontSize: 20,
        fontFamily: "NunitoSans-SemiBold",

    },
    primarybtn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
    },
    insideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        backgroundColor: 'white',
    },
    waitingText: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: 18,
        color: '#383F51',
        marginTop: 16,
        marginBottom: 16
    }
})

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price
    }
}
export default connect(mapStateToProps)(riderWait);
