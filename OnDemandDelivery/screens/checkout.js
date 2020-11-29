import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PlaceOrder from "../components/placeOrder";
import UserService from '../services/user-service';
import * as _ from 'lodash';

const checkout = (props) => {
    const { navigate } = props.navigation;
    const [address, setaddress] = useState(null);
    const price = props.route.params.price,
    store = props.route.params.store;
    useEffect( () => {
        UserService().getBuyerDetails().then((details) => {
            setaddress(details.Address);
        });
        
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.inputcontainerFirst}>
                <Text style={styles.inputlabel}>STORE</Text>
                <Text style={styles.labelValue}>{store}</Text>
            </View>
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>ADDRESS</Text>
                <Text style={styles.labelValue}>{address}</Text>
            </View>
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>AMOUNT TO PAY</Text>
                <Text style={styles.labelValue}>€ {_.ceil(price + 0.45, 2)} </Text>
            </View>
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>PAYMENT</Text>
                <Text style={styles.labelValue}>Cash on delivery</Text>
            </View>
            
            <PlaceOrder navigation={navigate} btnStyle={styles.btn} store={store} />
        </View>
    )
}

export default checkout

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingVertical: 15,
        backgroundColor: 'white'
    },
    inputcontainer: {
        marginTop: 24
    },
    inputcontainerFirst: {
        marginTop: 12
    },
    inputlabel: {
        fontSize: 14,
        fontFamily: "NunitoSans-SemiBold",
        color: '#6A748A'
    },
    labelValue: {
        color: '#383F51',
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 8,
    },
    btn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 40
    }
})
