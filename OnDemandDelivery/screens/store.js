import React from 'react'
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native'

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
            imageSrc: require('../assets/Images/Lidl.png'),
        },
        {
            id: 'centra',
            name: 'SuperValu',
            imageSrc: require('../assets/Images/SuperValu.png'),
        },
        {
            id: 'spar',
            name: 'Spar',
            imageSrc: require('../assets/Images/spar.png'),
        },
    ]

    return (
        <View style={styles.store}>
            <ScrollView>
                <Text style={styles.heading}>Select store</Text>
                <View style={styles.storeImgContainer}>
                    {listOfStores.map((prop, key) => {
                        return (
                            <TouchableOpacity key={prop.id} onPress={() => selectStore(prop.name, navigate)}>
                                <Image
                                    style={styles.eachStore}
                                    key={prop.id}
                                    source={prop.imageSrc}
                                />
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const selectStore = (props, navigate) => {
    console.log(props);
    navigate('Category', props)
}

const styles = StyleSheet.create({
    store: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 24,
        color: '#383F51',
        marginTop: 16,
        fontFamily: "NunitoSans-Bold"
    },
    storeImgContainer: {
        marginBottom: 24
    },
    eachStore: {
        width: '100%',
        marginTop: 16,
        borderRadius: 4
    }
})

export default store
