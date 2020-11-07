import React,{ useEffect, useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Header, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const modalHeader = (props) => {
    const [title, setTitle] = useState('')
    useEffect(() => {      
        if (!props.title) {
            AsyncStorage.getItem('orderId').then((id) => setTitle('ORDER ID #' + id))
        } else {
            setTitle(props.title);
        }
        
    }, [])
    
    return (
        <View>
            <Header
                leftComponent={{ text: title, style: { color: '#383F51', fontFamily: "NunitoSans-Bold", fontSize: 18, width: 275 } }}
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
        paddingTop: 0,
        height: 60,
        borderBottomColor: 'transparent'
    }

})
