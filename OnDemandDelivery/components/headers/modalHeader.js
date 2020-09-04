import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon, Button } from 'react-native-elements';
import { size } from 'lodash';

const modalHeader = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
                <Button
                    buttonStyle={styles.buttonContainer}
                    icon={{
                        name: "close",
                        size: 20,
                        color: 'black',
                        style: { margin: 0 }
                    }}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
        </View>
    )
}

export default modalHeader

const styles = StyleSheet.create({
    mainContainer: {
        height: 70
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    },
    title: {
        width: 170,
        fontSize: 20,
        fontWeight: '800'
    },
    buttonContainer: {
        width: 50,
        height: 40,
        alignSelf: 'flex-end',
        color: 'white'
    }

})
