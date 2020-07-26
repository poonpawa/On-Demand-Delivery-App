import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native'
import { Text, ListItem, Button, Divider } from 'react-native-elements';

const cart = (props) => {
    return (
        <View>
            <Text>Product List</Text>
            {props.products.map((prop, key) => {
                return (
                    <View>
                        <ListItem
                            key={key}
                            title={prop.ProductName}
                            rightTitle={prop.Price * prop.quantity}
                            subtitle={
                                <View style={styles.quantityView}>
                                    <Button
                                        buttonStyle={styles.counterBtn}
                                        iconContainerStyle={styles.icon}
                                        icon={{
                                            name: "add",
                                            size: 8,
                                            color: "black"
                                        }}
                                        type="solid"
                                        onPress={() => props.addToCart(prop)} />
                                    <Text style={{ marginHorizontal: 12, height: 20, alignContent: "center" }}>{prop.quantity}</Text>
                                    <Button
                                        buttonStyle={styles.counterBtn}
                                        iconContainerStyle={styles.icon}
                                        icon={{
                                            name: "remove",
                                            size: 8,
                                            color: "black"
                                        }}
                                        type="solid"
                                        onPress={() => props.removeFromCart(prop)} />
                                </View>
                            }
                            bottomDivider
                        />
                    </View>
                )
            })}
            <Divider style={{ height: 1, backgroundColor: 'blue' }} />
            <Text>Items Total: {props.price}</Text>
            <Button title="Place Order" />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cart)

const styles = StyleSheet.create({
    icon: {
        width: 25
    },
    counterBtn: {
        width: 25,
        height: 20
    },
    quantityView: {
        flexDirection: 'row'
    }
})
