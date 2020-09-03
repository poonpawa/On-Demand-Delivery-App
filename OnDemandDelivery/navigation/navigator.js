import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Icon, Button } from 'react-native-elements';
import SplashScreen from '../screens/splashScreen';
import { View } from 'react-native';
import Home from '../screens/home';
import Store from '../screens/store';
import Category from '../screens/category';
import Product from '../screens/product';
import Cart from '../screens/cart';
import Login from '../screens/login';
import Register from '../screens/register';
import CartIcon from '../components/cartIcon';
import Loading from '../screens/loading';
import RiderWait from '../screens/riderWait';
import Tracking from '../screens/tracking';
import Delivered from '../screens/delivered';
import Account from '../screens/account';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const bottomNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Order" component={OrderNavigation} />
            <Tab.Screen name="Cart" component={Cart}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CartIcon />
                    )
                }} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

const OrderNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="address" component={Home} />
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={bottomNavigation} />
            <Stack.Screen name="RiderWait" component={RiderWait} />
            <Stack.Screen name="Tracking" component={Tracking} />
            <Stack.Screen name="Delivered" component={Delivered} />
        </Stack.Navigator>
    )
}

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }} >
            <Stack.Screen name="Login" component={Login} options={{
                header: ({ navigation }) => (
                    <View style={{ height: 30, marginVertical: 10 }}>
                        <Text style={{ width: 30 }}>Title</Text>
                        <Button
                            icon={{
                                name: "close",
                                size: 26,
                                color: 'white'
                            }}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                )
            }} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator >
    )

}

const navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="App" component={AppNavigation} />
                <Stack.Screen name="Auth" component={AuthNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default navigator;