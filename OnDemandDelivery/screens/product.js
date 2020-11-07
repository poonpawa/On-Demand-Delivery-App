import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import StoreService from '../services/store-service';
import { Card, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

const product = (props) => {
    const [productList, setproductList] = useState([])

    useEffect(() => {
        let array = [], product;

        StoreService().getProducts(props.route.params.store, props.route.params.category).then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                product = getQuantityFromStore(props, doc.data().ProductId);
                doc.data()['quantity'] = product ? product.quantity : 0;
                array.push(doc.data());
            })
            setproductList(array);
        }).catch((err) => {
            console.log(err);
        });

        props.updateStore(props.route.params.store)

    }, [])

    const getQuantityFromStore = (props, id) => {
        return props.products.find((item) => item.ProductId === id);
    }


    return (
        <View style={styles.productContainer}>
            <Text style={styles.productHeading}>Product List</Text>
            {productList.map((prop, key) => {
                return (
                    <View style={styles.eachproduct}
                        key={key}>
                        <View style={styles.eachproductImgContainer}>
                            <Image 
                                style={styles.eachproductImg}
                                source={{uri: prop.url}} />
                        </View>
                        <View style={styles.eachproductDesc}>
                            <Text style={styles.eachproductName}>
                                {prop.ProductName}
                            </Text>
                            <Text style={styles.eachproductPrice}>
                                {prop.Price} Euro
                            </Text>
                            <View style={styles.quantityView}>
                                <TouchableOpacity onPress={() => props.removeFromCart(prop)}>
                                    <Image 
                                        style={styles.removeProduct}
                                        source={require('../assets/Images/removeProduct.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.productQuantity}>{prop.quantity}</Text>
                                <TouchableOpacity onPress={() => props.addToCart(prop)    }>
                                    <Image 
                                        style={styles.addProduct}
                                        source={require('../assets/Images/addProduct.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price,
        state: state.store
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch({ type: 'ADD_TO_CART', product: product }),
        removeFromCart: (product) => dispatch({ type: 'REMOVE_FROM_CART', product: product }),
        updateStore: (store) => dispatch({type: 'UPDATE_STORE', store: store}) 
    }
}

const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        height: '100%'
    },
    productHeading: {
        fontSize: 24,
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        marginTop: 20,
    },
    eachproduct: {
        flexDirection: 'row',
        borderColor: 'transparent',
        borderBottomColor: '#EFF2F9',
        borderWidth: 1,
        marginTop: 16,
        paddingBottom: 16
    },
    eachproductImgContainer: {
        width: 106,
        height: 84,
        paddingRight: 16
    },
    eachproductImg: {
        width: '100%',
        height: '100%'
    },
    eachproductName: {
        fontSize: 16,
        fontFamily: "NunitoSans-SemiBold",
        color: '#383F51'
    },
    eachproductPrice: {
        fontSize: 16,
        fontFamily: "NunitoSans-Bold",
        color: '#383F51',
        marginTop: 4,
    },
    quantityView: {
        flexDirection: 'row',
        marginTop: 4,
        alignItems: 'center'
    },
    removeProduct: {
        marginRight: 12
    },
    productQuantity: {
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    },
    addProduct: {
        marginLeft: 12
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(product)
