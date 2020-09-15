import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { ListItem, Button, Divider, Icon } from 'react-native-elements';

const cart = (props) => {
    return (
        <View style={styles.cartContainer}>
            <Text style={styles.cartHeading}>Cart</Text>
            {props.products.map((prop, key) => {
                return (
                    <View key={key}>
                        <View style={styles.eachCartContainer}>
                            
                            <View style={styles.eachCartLeft}>
                                
                                <View style={styles.eachproductImgContainer}>
                                    <Image 
                                        style={styles.eachproductImg}
                                        source={require('../assets/Images/fruits.png')} />
                                </View>
                                
                                <View style={styles.eachCartDescContainer}>
                                    <View style={styles.eachCartDesc}>
                                        <Text style={styles.eachproductName}>
                                            {prop.quantity} x {prop.ProductName}
                                        </Text>
                                    </View>
                                    <View style={styles.quantityView}>
                                        <TouchableOpacity onPress={() => props.removeFromCart(prop)}>
                                            <Image 
                                                style={styles.removeProduct}
                                                source={require('../assets/Images/removeProduct.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.productQuantity}>{prop.quantity}</Text>
                                        <TouchableOpacity onPress={() => props.addToCart(prop)}>
                                            <Image 
                                                style={styles.addProduct}
                                                source={require('../assets/Images/addProduct.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.removeFromCart(prop)}>
                                            <Image 
                                                style={styles.deleteProduct}
                                                source={require('../assets/Images/delete.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
    
                            </View>
                            
                            <View style={styles.eachCartRight}>
                                <Text style={styles.eachCartPrice}>
                                        {prop.Price} Euro
                                </Text>
                            </View>
                        </View>
                    </View>
                )
            })}

            <View style={styles.itemsTotalContainer}>
                <Text style={styles.itemsTotal}>Items Total</Text>
                <Text style={styles.itemsTotalPrice}>{props.price} Euro</Text>
            </View>
            <View style={styles.deliveryFeeContainer}>
                <Text style={styles.deliveryFee}>Delivery Fee</Text>
                <Text style={styles.deliveryFeePrice}>0.45 Euro</Text>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalFee}>TOTAL</Text>
                <Text style={styles.totalFeePrice}>{props.price} Euro</Text>
            </View>
            <Button buttonStyle={styles.primaryBtn} color="#C75300" title="Place Order" />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.totalItems,
        price: state.price
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch({ type: 'ADD_TO_CART', product: product }),
        removeFromCart: (product) => dispatch({ type: 'REMOVE_FROM_CART', product: product }),
        deleteItem: (product) => dispatch({ type: 'DELETE_ITEM', product: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cart)

const styles = StyleSheet.create({
    itemsTotalContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deliveryFeeContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemsTotal: {
        color: '#383F51',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 16,
    },
    itemsTotalPrice: {
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    },
    deliveryFee: {
        color: '#383F51',
        fontFamily: "NunitoSans-SemiBold",
        fontSize: 16,
    },
    deliveryFeePrice: {
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    },
    totalContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'transparent',
        borderTopColor: '#A5A5AF',
        borderWidth: 1,
        paddingTop: 16
    },
    totalFee: {
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    },
    totalFeePrice: {
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    },
    primaryBtn: {
        borderRadius: 4,
        backgroundColor: '#C75300',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16,
        marginTop: 16
    },
    cartContainer: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        height: '100%'
    },
    cartHeading: {
        fontSize: 20,
        color: '#383F51',
        fontFamily: "NunitoSans-Bold",
        marginTop: 20,
    },
    eachCartContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'transparent',
        borderBottomColor: '#EFF2F9',
        borderWidth: 1,
        marginTop: 16,
        paddingBottom: 16
    },
    eachCartLeft: {
        flexDirection: 'row',
    },
    eachCartRight: {
        width: 100
    },
    eachCartPrice: {
        textAlign: 'right',
        color: '#3C465E',
        fontFamily: "NunitoSans-Bold",
        fontSize: 16
    },
    eachproductImgContainer: {
        width: 106,
        height: 84,
        paddingRight: 16
    },
    eachproductImg: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    },
    eachproductName: {
        fontSize: 14,
        color: '#3C465E',
        fontFamily: "NunitoSans-SemiBold",
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
    deleteProduct: {
        marginLeft: 16,
    }
})
