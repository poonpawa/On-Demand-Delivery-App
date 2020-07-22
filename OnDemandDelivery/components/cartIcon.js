import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import { connect } from 'react-redux';

const cartIcon = (props) => {
    return (
        <View>
            <Icon
                name='ios-cart'
                type='ionicon'
                color='#517fa4'
                size={35}
            />

            <Badge
                status="success"
                value={props.total}
                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
            />
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products,
        total: state.total,
        price: state.price
    }
}

export default connect(mapStateToProps)(cartIcon)

const styles = StyleSheet.create({})
