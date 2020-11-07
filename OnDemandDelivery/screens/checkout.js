import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PlaceOrder from "../components/placeOrder";
import UserService from '../services/user-service';

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
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>OrderDetails</Text>
                <Text style={styles.labelValue}>Total Cost:  {price} Euro </Text>
                <Text style={styles.labelValue}>Store:  {store} </Text>
            </View>
            <View style={styles.inputcontainer}>
                <Text style={styles.inputlabel}>Address</Text>
                <Text style={styles.labelValue}>Home: {address} </Text>
            </View>
            <View style={styles.inputcontainer}>
            <Text style={styles.inputlabel}>Payment Method</Text>
                <Text style={styles.labelValue}>Cash On Delivery</Text>
            </View>
            
            <PlaceOrder navigation={navigate} btnStyle={styles.btn} />
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
    headTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 35,
        color: '#383F51',
        marginTop: 16,
        fontFamily: "NunitoSans-Bold"
    },
    inputcontainer: {
        marginTop: 24
    },
    inputlabel: {
        fontSize: 20,
        fontFamily: "NunitoSans-SemiBold",
        color: '#383F51'
    },
    labelValue: {
        height: 40,
        color: '#505971',
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        borderColor: '#C7CBD8',
        //borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
        padding: 8,
        height : 60
        
    },
    btn: {
        backgroundColor: "#C75300",
        borderRadius: 4,
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        marginTop: 40
    }
})
