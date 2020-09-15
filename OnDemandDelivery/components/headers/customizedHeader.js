
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import CartIcon from '../cartIcon';


const modalHeader = (props) => {
    return (
        <View>
            <Header
                rightComponent={() => {
                    if (props.isRight && props.isSearch) {
                        return (
                            <View style={styles.rightComponent}>
                                <Icon name='search' color='#fff' type="Ionicons" size={28} />
                                <CartIcon navigate={props.navigation.navigate} />
                            </View>
                        )
                    } else if (props.isSearch) {
                        return (
                            <View style={styles.rightComponent}>
                                <Icon name='search' color='#fff' type="Ionicons" size={28} />
                            </View>
                        )
                    }
                }}
                centerComponent={{ text: props.title, style: { color: '#fff' } }}
                leftComponent={{
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
        padding: 10
    },
    rightComponent: {
        flex: 1,
        flexDirection: 'row'
    }

})
