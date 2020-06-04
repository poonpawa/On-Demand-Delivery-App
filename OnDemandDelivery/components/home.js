import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const home = (props) => {
    const { navigate } = props.navigation;
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Welcome</Text>
            <Button title="Sign-Out" buttonStyle={styles.btn} onPress={() => {
                signOut()
            }} />
        </View>
    )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 30
    },
    btn: {
        width: 100,
        color: "#333334",
        marginTop: 40
    }
})
