import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Geolocation from "../components/geolocation";
import NotificationTokenService from "../services/notification-token-service";


const home = (props) => {
    let useObj = {};
    const { navigate } = props.navigation;
    const displayName = auth().currentUser.displayName;

    useEffect(() => {
        //get Token for every logged-in user & store in db
        NotificationTokenService().getTokenAndStore()
    }, [])

    return (
        <View style={styles.container}>
            {/* <Text style={{ fontSize: 25 }}>Welcome <Text style={{ color: "#C75300", fontWeight: "bold" }}>{displayName}</Text></Text> */}
            
            <Text style={styles.heading}>Add address</Text>
            
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>Address</Text>
                <TextInput style={styles.inputbox} 
                    underlineColorAndroid = "transparent"
                    selectionColor ='#C75300'
                    autoCapitalize="none"
                ></TextInput>
            </View>
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>EIR code</Text>
                <TextInput style={styles.inputbox} 
                    underlineColorAndroid = "transparent"
                    selectionColor ='#C75300'
                    autoCapitalize="none"
                ></TextInput>
            </View>

            <Geolocation />
            <Button title="Proceed" buttonStyle={styles.btn} onPress={() => {
                navigate('Store')
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 24,
        color: '#383F51',
        marginTop: 16,
        fontFamily: "NunitoSans-Bold"
    },
    inputcontainer: {
        marginTop: 24
    },
    inputlabel: {
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        color: '#383F51'
    },
    inputbox: {
        height: 40,
        color: '#505971',
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        borderColor: '#C7CBD8',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
        paddingLeft: 8
        
    },
    btn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 40
    }
})

export default home
