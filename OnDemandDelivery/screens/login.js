import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const login = (props) => {
    const { navigate } = props.navigation
    const [email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)

    return (
        <View style={styles.container}>

            <View style={styles.form}>
                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Email address</Text>
                    <TextInput style={styles.inputbox} 
                        underlineColorAndroid = "transparent"
                        selectionColor ='#C75300'
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    ></TextInput>
                </View>


                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Password</Text>
                    <TextInput style={styles.inputbox} 
                        underlineColorAndroid = "transparent"
                        selectionColor ='#C75300'
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={password => setpassword(password)}
                        value={password}
                    ></TextInput>
                </View>

                <Button title="Login" onPress={() => onlogin(email, password, navigate)} buttonStyle={styles.primarybtn} />

                <View style={{ alignSelf: "center", marginTop: 16 }}>
                    <Text style={{ color: "#505971", fontSize: 15, fontFamily: "NunitoSans-Regular", }}>
                        Don't have an account?<Text style={{ color: "#C75300", fontFamily: "NunitoSans-SemiBold" }} onPress={() => { navigate("Register") }}> Sign Up</Text>
                    </Text>
                </View>

            </View>
        </View >
    )
}

const onlogin = (email, password, navigate) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("signed-In");
            navigate("App")

        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    form: {
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16
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
        color: '#383F51',
        fontSize: 16,
        fontFamily: "NunitoSans-Regular",
        borderColor: '#C7CBD8',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
        paddingLeft: 8
        
    },
    primarybtn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 40
    },
});
export default login;
