import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';

const splashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.splashImage}
                source={require('../assets/Images/splash-logo.png')} />
            
            <Image 
                style={styles.splashTitle}
                source={require('../assets/Images/FreshMart.png')} />
            
            <Text style={styles.desc}>Fresh groceries at your doorsteps</Text>  

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Auth', { screen: 'Login' })} style={styles.secondarybtn}>
                    <Text style={styles.textLogin}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Auth', { screen: 'Register' })} style={styles.primarybtn}>
                    <Text style={styles.textSignUp}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
}

export default splashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C75300',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "NunitoSans-Bold"
    },
    splashImage: {
        display: 'flex',
        alignItems: 'center'
    },
    splashTitle: {
        marginTop: -60,
    },
    desc: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 18,
        marginTop: 16 
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16
    },
    secondarybtn: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        height: 40,
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'transparent',
        marginRight: 8
    },
    primarybtn: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        height: 40,
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        marginLeft: 8
    },
    textLogin: {
        textAlign: 'center',
        color: 'white',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 16,
    },
    textSignUp: {
        textAlign: 'center',
        color: '#C75300',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 16,
    }
})
