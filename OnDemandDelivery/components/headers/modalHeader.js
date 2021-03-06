import React,{ useEffect, useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Header, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const modalHeader = (props) => {
    const [title, setTitle] = useState('')
    useEffect(() => {      
        if (!props.title) {
            AsyncStorage.getItem('orderId').then((id) => setTitle('Order ID #' + id))
        } else {
            setTitle(props.title);
        }  
    }, [])
    
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ text: title, style: { color: '#383F51', fontFamily: "NunitoSans-Bold", fontSize: 20, width: 275,  } }}
                rightComponent={{
                    icon: 'close',
                    color: '#6A748A',
                    onPress: () => {
                        if (props.goBack) {
                            if (props.goBack === 'Home') {
                                props.navigation.navigate('Home', { screen: 'Store' })
                            } else {
                            props.navigation.navigate(props.goBack)
                            }
                        } else {
                            props.navigation.goBack();
                        }
                    }  
                        
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
        paddingTop: 0,
        height: 60,
        borderBottomColor: 'transparent'
    }

})
