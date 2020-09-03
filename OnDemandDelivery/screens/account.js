import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderService } from '../services/order-service'
import firebase from "@react-native-firebase/app"
import { ListItem, Button } from 'react-native-elements'
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
        <ScrollView>
            <Text>Account Screen</Text>
            <View>
                <ListItem
                    title={'Logout'}
                    onPress={() => { signOut(props.navigation.navigate) }}
                    bottomDivider
                    chevron
                />
            </View>
            <View>
                {
                    orders.map((item, key) => (
                        <ListItem key={key}
                            title={'Order Id: ' + item.id}
                            subtitle={'Store: ' + item.store + '\nAmount Paid : €' + item.totalPrice}
                            rightSubtitle={<Button title='View Details' />}
                            bottomDivider />
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})

export default account
