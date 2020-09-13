import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
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
                <Button
                    buttonStyle={styles.secondarybtn}
                    title='Login' onPress={() => navigation.navigate('Auth', { screen: 'Login' })} />
                <Button
                    buttonStyle={styles.primarybtn}
                    title='Sign Up' onPress={() => navigation.navigate('Auth', { screen: 'Register' })} />
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
        marginLeft: 40,
        marginRight: 40
    },
    secondarybtn: {
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'transparent',
        fontSize: 16,
        width: 160,
        marginRight: 12
    },
    primarybtn: {
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'transparent',
        fontSize: 16,
        width: 160,
        marginLeft: 12
    }
})
