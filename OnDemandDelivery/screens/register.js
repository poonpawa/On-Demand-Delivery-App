import React, { useState } from 'react'
import { Button, Input, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import UserService from '../services/user-service';

const register = (props) => {
    const [email, setEmail] = useState(null),
        [password, setpassword] = useState(null),
        [name, setName] = useState(null),
        [confirmpass, setconfirmpass] = useState(null)
    const { navigate } = props.navigation

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{`Register\n On Demand Delivery`}</Text>

            <View style={styles.form}>
                <View>
                    <Input
                        placeholder="Name"
                        inputStyle={styles.input}
                        autoCapitalize="none"
                        onChangeText={name => setName(name)}
                        value={name}
                    ></Input>
                </View>

                <View>
                    <Input
                        placeholder="Email Address"
                        inputStyle={styles.input}
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    ></Input>
                </View>


                <View>
                    <Input
                        placeholder="Password"
                        inputStyle={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={password => setpassword(password)}
                        value={password}
                    ></Input>
                </View>


                <View>
                    <Input
                        placeholder="Confirm Password"
                        inputStyle={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={confirmpass => setconfirmpass(confirmpass)}
                        value={confirmpass}
                    ></Input>
                </View>


                <Button title="Sign Up" onPress={() => onRegister(name, email, password, confirmpass, navigate)} buttonStyle={styles.btn} />


                <View style={{ alignSelf: "center", marginTop: 25 }}>
                    <Text style={{ color: "#414959", fontSize: 15, fontWeight: "bold" }}>
                        Already have an account?<Text style={{ color: "#0000ff" }} onPress={() => { navigate("SignIn") }}> Login</Text>
                    </Text>
                </View>

            </View>
        </View >
    )
}

const onRegister = (name, email, password, confirmpass, navigate) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((User) => {
            console.log('User account created & signed in!');
            User.user.updateProfile({
                displayName: name
            }).then(() => {
                console.log(auth().currentUser.uid);
                UserService().AddUserDetails({ name, email })
                navigate("App")
            })

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
        fontSize: 20,
        fontWeight: "100",
        textAlign: "center"
    },
    form: {
        marginTop: 20
    },
    input: {
        fontSize: 17
    },
    btn: {
        width: 120,
        alignSelf: "center",
        margin: 15
    }
});

export default register
