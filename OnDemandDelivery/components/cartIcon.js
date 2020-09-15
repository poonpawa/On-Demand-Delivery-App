import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const cartIcon = (props) => {
    return (
        <View >
            <TouchableOpacity onPress={() => { props.navigate('Cart') }} style={styles.container}>
                <View>
                    <Icon
                        name='ios-cart'
                        type='ionicon'
                        color='#fff'
                        size={28}
                    />

                    <Badge
                        status="error"
                        value={props.total}
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                    />
                </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
    container: {
        padding: 5
    }
})
