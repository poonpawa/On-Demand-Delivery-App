import React, { useState } from 'react'
import { Button, Input, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import UserService from '../services/user-service';

const register = (props) => {
    const [email, setEmail] = useState(null),
        [password, setpassword] = useState(null),
        [name, setName] = useState(null),
        [phone, setPhone] = useState(null),
        [emailError, setMailError] = useState(null),
        [error, setError] = useState(null),
        [passError, setpassError] = useState(null),
        [phoneError, setphoneError] = useState(null);
    const { navigate } = props.navigation


    const onRegister = (name, email, phone, password, navigate) => {
        if (name && email && phone && password) {
            setError(null)
            if (phone.length < 10) {
                setphoneError('Invalid Phone Number. It should be 10 digits')
            } else {
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((User) => {
                        console.log('User account created & signed in!');
                        User.user.updateProfile({
                            displayName: name
                        }).then(() => {
                            console.log(auth().currentUser.uid);
                            UserService().AddUserDetails({ name, email, phone })
                            clearErrors();
                            navigate("App")
                        })
            
                    })
                    .catch(error => {
                        clearErrors();
                        switch(error.code){
                            case 'auth/email-already-in-use':
                                setMailError('That email address is already in use!')
                                break;
                            case 'auth/invalid-email':
                                setMailError('Email address is invalid')
                                break;
                            case 'auth/weak-password':
                                setpassError('Password should be at least 6 characters')
                                break;
                            case 'auth/operation-not allowed':
                                setError('Credentials are not allowed')
                                break;
                            default:
                                setError(error.message)
                        }   
                    });
                }
        } else {
            setError('Please enter all the above fields')
        }
    }

    const clearErrors = () => {
        setMailError(null)
        setError(null);
        setpassError(null)
        setphoneError(null)
    }

    const clearText = (e, field) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (field === 'email') {
                setMailError(null)
            } else if (field === 'pass') {
                setpassError(null)
            } else {
                setError(null)
            }
        }
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.head}>All below fields are required</Text>
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
                        placeholder="Email address will be used to login"
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}
                        value={email}
                        onKeyPress={(e) => clearText(e, 'email')}
                    ></TextInput>
                </View>
                {emailError!=null ?
                    <Text style={styles.error}>{emailError}</Text>
                    :<View></View>
                }

                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Phone number</Text>
                    <TextInput style={styles.inputbox}
                        underlineColorAndroid = "transparent" 
                        selectionColor ='#C75300'
                        keyboardType='numeric'
                        placeholder="10 digit phone number"
                        autoCapitalize="none"
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
                        onKeyPress={(e) => clearText(e, 'phone')}
                    ></TextInput>
                </View>
                {phoneError!=null ?
                    <Text style={styles.error}>{phoneError}</Text>
                    :<View></View>
                }

                <View style={styles.inputcontainer}>
                    <Text style={styles.inputlabel}>Password</Text>
                    <TextInput style={styles.inputbox} 
                        underlineColorAndroid = "transparent"
                        selectionColor ='#C75300'
                        placeholder="At least 6 characters"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={password => setpassword(password)}
                        value={password}
                        onKeyPress={(e) => clearText(e, 'pass')}
                    ></TextInput>
                </View>
                {passError!=null ?
                    <Text style={styles.error}>{passError}</Text>
                    :<View></View>
                }

                <View style={styles.button}>
                    {error!=null ?
                        <Text style={styles.errorAll}>{error}</Text>
                        :<View></View>
                    }
                    <Button title="Sign Up" onPress={() => onRegister(name, email, phone, password, navigate)} buttonStyle={styles.primarybtn} />
                </View>


                <View style={{ alignSelf: "center", marginTop: 16 }}>
                    <Text style={{ color: "#505971", fontSize: 15, fontFamily: "NunitoSans-Regular", }}>
                        Already have an account?<Text style={{ color: "#C75300", fontFamily: "NunitoSans-SemiBold" }} onPress={() => { navigate("Login") }}> Login</Text>
                    </Text>
                </View>

            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    head: {
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        color: '#383F51',
        marginTop: 0,
        paddingLeft: 16
    },
    form: {
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16
    },
    error: {
        fontSize: 14,
        fontFamily: "NunitoSans-SemiBold",
        color: '#EF2C2C',
        marginTop: 8
    },
    errorAll: {
        fontSize: 14,
        fontFamily: "NunitoSans-SemiBold",
        color: '#EF2C2C',
        marginBottom: 8
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
        color: '#383F51',
        fontSize: 16,
        fontFamily: "NunitoSans-Regular",
        borderColor: '#C7CBD8',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
        paddingLeft: 8
    },
    button: {
        marginTop: 40
    },
    primarybtn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",  
    },
});

export default register
