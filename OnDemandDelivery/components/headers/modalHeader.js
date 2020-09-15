import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Header, Button } from 'react-native-elements';

const modalHeader = (props) => {
    return (
        <View>
            <Header
                leftComponent={{ text: props.title, style: { color: '#fff' } }}
                rightComponent={{
                    icon: 'close',
                    color: '#fff',
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
        height: 55,
        padding: 20
    }

})
