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

            <Text style={styles.title}>{`Login\n On Demand Delivery`}</Text>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputText}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    ></TextInput>
                </View>


                <View>
                    <Text style={styles.inputText}> Password</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={password => setpassword(password)}
                        value={password}
                    ></TextInput>
                </View>


                <Button title="Login" onPress={() => onlogin(email, password, navigate)} buttonStyle={styles.btn} />


                <View style={{ alignSelf: "center", marginTop: 25 }}>
                    <Text style={{ color: "#414959", fontSize: 15, fontWeight: "bold" }}>
                        No account?<Text style={{ color: "#0000ff" }} onPress={() => { navigate("SignUp") }}> Sign Up</Text>
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
            navigate("Home")

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
        marginHorizontal: 20
    },
    title: {
        marginTop: 15,
        fontSize: 32,
        fontWeight: "100",
        textAlign: "center"
    },
    form: {
        marginTop: 30,
        marginHorizontal: 5,
        height: 150
    },
    inputText: {
        fontSize: 20,
        color: "#8A8F9E"
    },
    input: {
        fontSize: 20,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        marginBottom: 15
    },
    btn: {
        width: 120,
        alignSelf: "center"
    }
});
export default login;