import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { Tile } from 'react-native-elements';

const store = (props) => {
    const { navigate } = props.navigation;
    const listOfStores = [
        {
            id: 'fruits',
            name: 'Fruits',
            imageSrc: require('../assets/Images/fruits.png'),
        },
        {
            id: 'veggies',
            name: 'Vegetables',
            imageSrc: require('../assets/Images/vegetables.png'),
        },
        {
            id: 'bakery',
            name: 'Bakery',
            imageSrc: require('../assets/Images/breads.png'),
        },
        {
            id: 'toiletry',
            name: 'Toiletry',
            imageSrc: require('../assets/Images/toiletry.png'),
        },
    ]

    return (
        <ScrollView>
            <Text>Choose Category</Text>
            {listOfStores.map((prop, key) => {
                return (
                    <Tile
                        key={prop.id}
                        imageSrc={prop.imageSrc}
                        title={prop.id}
                        featured
                        onPress={() => selectCategory(prop.name, navigate)}
                    />
                )
            })
            }

        </ScrollView>
    )
}

const selectCategory = (props, navigate) => {
    console.log(props);
    navigate('Product')
}

const styles = StyleSheet.create({
    tile: {
        width: 10,
        height: 10,
        padding: 3
    }
})

export default store
