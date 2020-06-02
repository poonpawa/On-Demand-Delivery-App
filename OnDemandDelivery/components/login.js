import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

const login = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>{`Login\n On Demand Delivery`}</Text>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputText}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                    ></TextInput>
                </View>


                <View>
                    <Text style={styles.inputText}> Password</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 15,
        fontSize: 32,
        fontWeight: "100",
        textAlign: "center"
    },
    form: {
        marginTop: 30,
        marginHorizontal: 5
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
        marginBottom: 10
    },
    button: {
        marginHorizontal: 5,
        backgroundColor="#74003D",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        borderRadius: 4,
        marginTop: 20,

    }
});
export default login;