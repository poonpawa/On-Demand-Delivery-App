
import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import CartIcon from '../cartIcon';

    

  
const modalHeader = (props) => {
    const renderCustomLeftIcon = () => {
        return(
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                source={require('../../assets/Images/backbtn.png')}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <Header
                rightComponent={() => {
                    if (props.isRight && props.isSearch) {
                        return (
                            <View style={styles.rightComponent}>
                                {/* <Icon name='search' color='#6A748A' type="Ionicons" size={28} /> */}
                                <CartIcon navigate={props.navigation.navigate} />
                            </View>
                        )
                    } else if (props.isSearch) {
                        return (
                            <View style={styles.rightComponent}>
                                {/* <Icon name='search' color='#6A748A' type="Ionicons" size={28} /> */}
                            </View>
                        )
                    }
                }}
                
                centerComponent={{ text: props.title, style: { color: '#383F51', fontFamily: "NunitoSans-Bold", fontSize: 18 } }}
                leftComponent={() => renderCustomLeftIcon()}
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
        borderBottomColor: '#F3F3F3',
    },
    rightComponent: {
        flex: 1,
        flexDirection: 'row'
    }

})
