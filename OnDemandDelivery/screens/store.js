import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Tile } from 'react-native-elements';

const store = (props) => {
    const { navigate } = props.navigation;
    const listOfStores = [
        {
            id: 'tesco',
            name: 'Tesco',
            imageSrc: require('../assets/Images/tesco.png'),
        },
        {
            id: 'lidl',
            name: 'Lidl',
            imageSrc: require('../assets/Images/Lidl_logo.png'),
        },
        {
            id: 'centra',
            name: 'Centra',
            imageSrc: require('../assets/Images/centra-logo.png'),
        },
        {
            id: 'spar',
            name: 'Spar',
            imageSrc: require('../assets/Images/spar.png'),
        },
    ]

    return (
        <ScrollView>
            {listOfStores.map((prop, key) => {
                return (
                    <Tile
                        key={prop.id}
                        imageSrc={prop.imageSrc}
                        title={prop.id}
                        featured
                        onPress={() => selectStore(prop.name, navigate)}
                    />
                )
            })
            }
        </ScrollView>
    )
}

const selectStore = (props, navigate) => {
    console.log(props);
    navigate('Category')
}

const styles = StyleSheet.create({
    tile: {
        width: 10,
        height: 10,
        padding: 3
    }
})

export default store
