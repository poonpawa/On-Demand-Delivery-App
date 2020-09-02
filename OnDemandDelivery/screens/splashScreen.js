import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const splashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>splashScreen</Text>
            <Button
                buttonStyle={{ borderRadius: 0, marginVertical: 10, marginHorizontal: 20 }}
                title='Login' onPress={() => navigation.navigate('Auth', { screen: 'Login' })} />
            <Button
                buttonStyle={{ borderRadius: 0, marginVertical: 10, marginHorizontal: 20 }}
                title='Sign Up' onPress={() => navigation.navigate('Auth', { screen: 'Register' })} />
        </View>
    )
}

export default splashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
