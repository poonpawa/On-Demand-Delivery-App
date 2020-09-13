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


                <View style={{ alignSelf: "center", marginTop: 25 }}>
                    <Text style={{ color: "#414959", fontSize: 15, fontWeight: "bold" }}>
                        No account?<Text style={{ color: "#C75300" }} onPress={() => { navigate("Register") }}> Sign Up</Text>
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
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16
    },
    inputcontainer: {
        marginTop: 24
    },
    inputlabel: {
        color: '#383F51',
        fontSize: 16,
    },
    inputbox: {
        height: 40,
        color: '#505971',
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
        marginTop: 40
    },
});
export default login;
