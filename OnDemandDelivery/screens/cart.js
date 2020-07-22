import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'

const cart = (props) => {
    return (
        <View>
            <Text>{props.price}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state,
        Products: state.products,
        total: state.totalItems,
        price: state.price
    }
}

export default connect(mapStateToProps)(cart)

const styles = StyleSheet.create({})
