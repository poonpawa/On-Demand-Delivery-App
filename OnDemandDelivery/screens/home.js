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

            <View style={styles.addressDefaultContainer}>
                
                {!isLocationUpdated? 
                <View>
                    <Image style={styles.removeProduct}
                        source={require('../assets/Images/addressDefault.png')}
                    />
                    <Text style={styles.textLocationDefault}>No location detected, {"\n"} get current location</Text>
                </View> : 
                <View>
                    <Text style={styles.textLocationDefault}>location detected</Text>
                </View>}
                
                <Geolocation parentCallback={(loadingData) => {setisLocationUpdated(loadingData)}}/> 
            </View> 
            
            {isLocationUpdated ? 
            <View>
                <Button title="Proceed" buttonStyle={styles.btn} onPress={() => {
                    navigate('Home')
                }} />
            </View> 
            : 
            null} 



            
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
        fontSize: 16,
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
