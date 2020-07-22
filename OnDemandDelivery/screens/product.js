import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import StoreService from '../services/store-service';
import { Card, Button, Text } from 'react-native-elements';

const product = ({ navigation, route }) => {
    const [productList, setproductList] = useState([])
    const [count, setCounter] = useState(0)

    useEffect(() => {
        let array = [];
        StoreService().getProducts(route.params.store, route.params.category).then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                doc.data()['count'] = 0;
                array.push(doc.data());
            })
            setproductList(array);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const incrementCounter = () => {
        setCounter(count => count + 1)
    }

    const decrementCounter = () => {
        if (count > 0) {
            setCounter(count => count - 1)
        }
    }

    return (
        <View>
            <Text>Product List</Text>
            {productList.map((prop, key) => {
                return (
                    <Card
                        key={prop.ProductID}
                        image={require('../assets/Images/fruits.png')}>
                        <Text style={{ marginBottom: 10 }}>
                            {prop.ProductName}
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {prop.Price}
                        </Text>
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
                                onPress={() => incrementCounter(count)} />
                            <Text style={{ marginHorizontal: 12, height: 20, alignContent: "center" }}>{count}</Text>
                            <Button
                                buttonStyle={styles.counterBtn}
                                iconContainerStyle={styles.icon}
                                icon={{
                                    name: "remove",
                                    size: 8,
                                    color: "black"
                                }}
                                type="solid"
                                onPress={() => decrementCounter(count)} />
                        </View>
                    </Card>
                )
            })}
        </View>
    )
}

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

export default product
