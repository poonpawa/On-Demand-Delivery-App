import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Header, Button } from 'react-native-elements';

const modalHeader = (props) => {
    return (
        <View>
            <Header
                leftComponent={{ text: props.title, style: { color: '#383F51', fontFamily: "NunitoSans-Bold", fontSize: 24, width: 275 } }}
                rightComponent={{
                    icon: 'close',
                    color: '#6A748A',
                    onPress:
                        () => props.navigation.goBack()
                }}
                containerStyle={styles.mainContainer}
            />
        </View>
    )
}

export default modalHeader

const styles = StyleSheet.create({
    mainContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
        borderBottomColor: 'transparent'
    }

})
