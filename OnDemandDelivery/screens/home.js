import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { BackHandler } from "react-native";
import auth from '@react-native-firebase/auth';
import Geolocation from "../components/geolocation";
import NotificationTokenService from "../services/notification-token-service";
import { CommonActions } from '@react-navigation/native';

const home = (props) => {
    let useObj = {};
    const { navigate } = props.navigation;
    const [isLocationUpdated, setisLocationUpdated] = useState(false)
    let displayName;
    if (auth().currentUser) {
        displayName = auth().currentUser.displayName;
    } else {
        displayName = 'default'
    }

    useEffect(() => {
        //get Token for every logged-in user & store in db
        NotificationTokenService().getTokenAndStore()
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            async () => { 
                BackHandler.exitApp();
                return true;
            }
        );
        return () => backHandler.remove();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Address</Text>
            <View style={styles.headTop}>
            {isLocationUpdated ? 
                <View>
                    <Geolocation parentCallback={(loadingData) => {setisLocationUpdated(loadingData)}}/>
                </View> 
                :
                <View></View>
            }
            </View>
            {/* <View style={styles.inputcontainer}>
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
            </View> */}
            
            {isLocationUpdated ? 
            <View>
                <Button title="Proceed" buttonStyle={styles.btn} onPress={() => {
                    navigate('Home')
                }} />
            </View> 
            : 
            <View style={styles.addressDefaultContainer}>
                <Image style={styles.removeProduct}
                    source={require('../assets/Images/addressDefault.png')}
                />
                <Text style={styles.textLocationDefault}>No location detected, {"\n"} get current location</Text>
                <Geolocation parentCallback={(loadingData) => {setisLocationUpdated(loadingData)}}/>
            </View>} 



            
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
    addressDefaultContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    textLocationDefault: {
        fontSize: 14,
        color: '#6A748A',
        fontFamily: "NunitoSans-Regular",
        marginTop: 12
    },
    headTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        marginTop: 70
    }
})

export default home
