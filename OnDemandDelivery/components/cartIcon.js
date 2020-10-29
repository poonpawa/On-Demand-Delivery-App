import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Icon, Badge } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const cartIcon = (props) => {
    return (
        <View >
            <TouchableOpacity onPress={() => { if (props.navigate) { props.navigate('Cart') } }} style={styles.container}>
                <View>
                    <Image
                        source={require('../assets/Images/cartDefault.png')}
                    />
                    {!props.total>0 ?
                        <View></View>
                        :
                        <Badge
                            status="warning"
                            value={props.total}
                            containerStyle={{ position: 'absolute', top: -2, right: -4, }}
                        />
                    }
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
