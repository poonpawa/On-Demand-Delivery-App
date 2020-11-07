import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Text, Alert } from 'react-native'

const store = (props) => {
    const { navigate } = props.navigation;
    useEffect(() => {
        console.log(props.products);
        
    }, []);
    
    const listOfStores = [
        {
            id: 'tesco',
            name: 'Tesco',
            imageSrc: require('../assets/Images/tesco.png'),
        },
        {
            id: 'lidl',
            name: 'Lidl',
            imageSrc: require('../assets/Images/Lidl.png'),
        },
        {
            id: 'centra',
            name: 'Centra',
            imageSrc: require('../assets/Images/SuperValu.png'),
        },
        {
            id: 'spar',
            name: 'Spar',
            imageSrc: require('../assets/Images/spar.png'),
        },
    ]

    return (
        <View style={styles.store}>
            <Text style={styles.heading}>Select store</Text>
            <ScrollView>
                <View style={styles.storeImgContainer}>
                    {listOfStores.map((prop, key) => {
                        return (
                            <TouchableOpacity key={prop.id} onPress={() => selectStore(props.store, prop.name, navigate, props)}>
                                <Image
                                    style={styles.eachStore}
                                    key={prop.id}
                                    source={prop.imageSrc}
                                />
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.totalItems,
        price: state.price,
        store: state.store
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch({type: 'CLEAR_CART'})
    }
}

const selectStore = (oldStore, newStore, navigate, props) => {
    if (oldStore !== '' && oldStore !== newStore && props.products.length > 0) {
        Alert.alert(
            "Confirm Dialog",
            "You are about to change the store.If you continue your cart will be cleared",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  props.clearCart()
                  navigate('Category', newStore)
               }}])
    } else {
        navigate('Category', newStore)
    }
}

const styles = StyleSheet.create({
    store: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 24,
        color: '#383F51',
        marginTop: 16,
        fontFamily: "NunitoSans-Bold"
    },
    storeImgContainer: {
        marginBottom: 74
    },
    eachStore: {
        width: '100%',
        marginTop: 16,
        borderRadius: 4
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(store)
