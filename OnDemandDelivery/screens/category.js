import React from 'react'
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native'

const store = ({ navigation, route }) => {
    const { navigate } = navigation;
    const selectedStore = route.params;
    const listOfCategory = [
        {
            id: 'Fruits Vegetables',
            name: 'Fruits Vegetables',
            imageSrc: require('../assets/Images/FruitsVeg.png'),
        },
        {
            id: 'Meat',
            name: 'Meat',
            imageSrc: require('../assets/Images/Meat.png'),
        },
        {
            id: 'Drinks',
            name: 'Drinks',
            imageSrc: require('../assets/Images/Drinks.png'),
        },
        {
            id: 'Bakery',
            name: 'Bakery',
            imageSrc: require('../assets/Images/Bakery.png'),
        },
    ]

    return (
        <View style={styles.category}>
            <Text style={styles.heading}>Choose category</Text>
            <ScrollView>
                <View style={styles.categoryImgContainer}>
                    {listOfCategory.map((prop, key) => {
                        return (
                            <TouchableOpacity key={prop.id} onPress={() => selectCategory(prop.name, navigate, selectedStore)}>
                                <Image 
                                    style={styles.eachCategory}
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

const selectCategory = (category, navigate, store) => {
    navigate('Product', { store, category })
}

const styles = StyleSheet.create({
    category: {
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
    categoryImgContainer: {
        marginBottom: 74
    },
    eachCategory: {
        width: '100%',
        marginTop: 16,
        borderRadius: 4
    }
})

export default store
