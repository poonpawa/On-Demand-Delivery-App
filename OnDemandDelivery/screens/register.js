import React, { useState } from 'react'
import { Button, Input, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import UserService from '../services/user-service';

const register = (props) => {
    const [email, setEmail] = useState(null),
        [password, setpassword] = useState(null),
        [name, setName] = useState(null),
        [phone, setPhone] = useState(null)
    const { navigate } = props.navigation

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{`Register\n On Demand Delivery`}<Text style={{ color: "#C75300" }}> Buyer</Text></Text>

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
                        placeholder="phone"
                        inputStyle={styles.input}
                        autoCapitalize="none"
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
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

                <Button title="Sign Up" onPress={() => onRegister(name, email, phone, password, navigate)} buttonStyle={styles.btn} />


                <View style={{ alignSelf: "center", marginTop: 25 }}>
                    <Text style={{ color: "#414959", fontSize: 15, fontWeight: "bold" }}>
                        Already have an account?<Text style={{ color: "#C75300" }} onPress={() => { navigate("Login") }}> Login</Text>
                    </Text>
                </View>

            </View>
        </View >
    )
}

const onRegister = (name, email, phone, password, navigate) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((User) => {
            console.log('User account created & signed in!');
            User.user.updateProfile({
                displayName: name
            }).then(() => {
                console.log(auth().currentUser.uid);
                UserService().AddUserDetails({ name, email, phone })
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
        margin: 15,
        backgroundColor: "#C75300"
    }
});

export default register
