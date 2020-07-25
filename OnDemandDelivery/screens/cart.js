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
                            subtitle={prop.Price}
                            rightTitle={prop.quantity}
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

export default connect(mapStateToProps)(cart)

const styles = StyleSheet.create({})
