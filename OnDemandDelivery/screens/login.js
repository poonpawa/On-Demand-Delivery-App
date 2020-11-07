import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const login = (props) => {
    const { navigate } = props.navigation
    const [email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)
    const [emailError, setMailError] = useState(null)
    const [error, setError] = useState(null)
    const [passError, setpassError] = useState(null)

    const onlogin = (email, password, navigate) => {
        if (email !== null && password !== null) {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("signed-In");
                clearErrors();
                navigate("App")
    
            })
            .catch(error => {
                clearErrors()
                switch(error.code){
                    case 'auth/email-already-in-use':
                        setMailError('That email address is already in use!')
                        break;
                    case 'auth/invalid-email':
                        setMailError('That email address is invalid!')
                        break;
                    case 'auth/wrong-password':
                        setpassError('Wrong Password')
                        break;
                    case 'auth/user-not-found':
                        setError('You need to sign in first')
                        break;
                    default:
                        setError(error.message)
                }   
            });
        } else {
            setError('Please enter all the fields')
        }
    }

    const clearErrors = () => {
        setMailError(null)
        setError(null);
        setpassError(null)
    }

    const clearText = (e, field) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (field === 'email') {
                setMailError(null)
            } else {
                setError(null)
            }
        }
    }

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
                        onKeyPress={(e) => clearText(e, 'email')}
                    ></TextInput>
                    {emailError!=null ?
                        <Text style={styles.error}>{emailError}</Text>
                        :<View></View>
                    }
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
                        onKeyPress={(e) => clearText(e, 'pass')}
                    ></TextInput>
                    {passError!=null ?
                        <Text style={styles.error}>{passError}</Text>
                        :<View></View>
                    }
                </View>
                
                {error!=null ?
                    <Text style={styles.error}>{error}</Text>
                    :<View></View>
                }

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
    error: {
        fontSize: 14,
        fontFamily: "NunitoSans-SemiBold",
        color: '#EF2C2C',
        marginTop: 8
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
