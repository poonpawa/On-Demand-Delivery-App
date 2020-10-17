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

            <View style={styles.form}>
                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Name</Text>
                    <TextInput style={styles.inputbox} 
                        underlineColorAndroid = "transparent"
                        selectionColor ='#C75300'
                        placeholder="Name"
                        autoCapitalize="none"
                        onChangeText={name => setName(name)}
                        value={name}
                    ></TextInput>
                </View>

                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Email address</Text>
                    <TextInput style={styles.inputbox}
                        underlineColorAndroid = "transparent" 
                        selectionColor ='#C75300'
                        placeholder="Email address"
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    ></TextInput>
                </View>

                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Phone number</Text>
                    <TextInput style={styles.inputbox}
                        underlineColorAndroid = "transparent" 
                        selectionColor ='#C75300'
                        placeholder="Phone"
                        autoCapitalize="none"
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
                    ></TextInput>
                </View>


                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Password</Text>
                    <TextInput style={styles.inputbox} 
                        underlineColorAndroid = "transparent"
                        selectionColor ='#C75300'
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={password => setpassword(password)}
                        value={password}
                    ></TextInput>
                </View>

                <Button title="Sign Up" onPress={() => onRegister(name, email, phone, password, navigate)} buttonStyle={styles.primarybtn} />


                <View style={{ alignSelf: "center", marginTop: 16 }}>
                    <Text style={{ color: "#505971", fontSize: 15, fontFamily: "NunitoSans-Regular", }}>
                        Already have an account?<Text style={{ color: "#C75300", fontFamily: "NunitoSans-SemiBold" }} onPress={() => { navigate("Login") }}> Login</Text>
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
        color: '#383F51',
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
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
    primarybtn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 40
    },
});

export default register
