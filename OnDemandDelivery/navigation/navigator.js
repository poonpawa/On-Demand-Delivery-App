import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/splashScreen';
import { Icon } from 'react-native-elements';
import { View, Image } from 'react-native';
import Home from '../screens/home';
import Store from '../screens/store';
import Category from '../screens/category';
import Product from '../screens/product';
import Cart from '../screens/cart';
import Login from '../screens/login';
import Register from '../screens/register';
import CartIcon from '../components/cartIcon';
import CartIconFocused from '../components/cartIconFocused';
import Loading from '../screens/loading';
import RiderWait from '../screens/riderWait';
import Tracking from '../screens/tracking';
import Delivered from '../screens/delivered';
import Account from '../screens/account';
import Checkout from '../screens/checkout';
import ModalHeader from '../components/headers/modalHeader';
import CustomizedHeader from '../components/headers/customizedHeader';
import LogoHeader from '../components/headers/logoHeader';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const bottomNavigation = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#C75300',
                inactiveTintColor: '#6D7C8C',
                style: {
                    borderTopColor: '#EAEAEA',
                },
                labelStyle: {
                    textAlign: 'center',
                    fontSize: 12,
                    fontFamily: "NunitoSans-SemiBold",
                }
            }}
            screenOptions={{ headerShown: true }}>
            <Tab.Screen name="Order" component={OrderNavigation} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    focused
                        ? <Image
                        source={require('../assets/Images/orderFocused.png')}
                        />
                        : <Image
                        source={require('../assets/Images/orderDefault.png')}
                        />
                )
            }} />
            <Tab.Screen name="Cart" component={Cart}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused
                        ? <CartIconFocused color={color} />
                        : <CartIcon color={color} />
                    ),
                    header: ({ navigation }) => (
                        <ModalHeader navigation={navigation} title={'Cart'} />
                    )
                    
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    focused
                        ? <Image
                        source={require('../assets/Images/accountFocused.png')}
                        />
                        : <Image
                        source={require('../assets/Images/accountDefault.png')}
                        />
                ),
                header: ({ navigation }) => (
                    <ModalHeader navigation={navigation} title={'Account'} />
                )
            }} />
        </Tab.Navigator>
    )
}

const OrderNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            
            <Stack.Screen name="Store" component={Store} options={{
                header: ({ navigation }) => (
                    <LogoHeader/>
                )
            }} />
            <Stack.Screen name="Category" component={Category} options={{
                header: (props) => {
                    let store = props.scene.route.params;
                    return (
                        <CustomizedHeader navigation={props.navigation} title={store} isSearch={true} />
                    )
                }
            }} />
            <Stack.Screen name="Product" component={Product} options={{
                header: (props) => {
                    let store = props.scene.route.params.store;
                    return (
                        <CustomizedHeader navigation={props.navigation} title={store} isRight={false} isSearch={false} />
                    )
                } 

            }} />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="address" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="address" component={Home} options={{
                header: ({ navigation }) => (
                    <LogoHeader/>
                )
            }} />
            <Stack.Screen name="Home" component={bottomNavigation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="RiderWait" component={RiderWait} 
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name="Checkout" component={Checkout} options={{
                header: (props) => {
                    return (
                        <CustomizedHeader navigation={props.navigation} title={'Place Order'} isRight={false} isSearch={false} />
                    )
                }
            }}/>

            <Stack.Screen name="Tracking" component={Tracking} options={{
                header: ({ navigation }) => (
                        <ModalHeader navigation={navigation} />    
                    )    
            }}/>
            <Stack.Screen name="Delivered" component={Delivered} options={{
                header: ({ navigation }) => (
                        <ModalHeader navigation={navigation} />    
                    )    
            }}/>

        </Stack.Navigator>
    )
}

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }} >
            <Stack.Screen name="Login" component={Login} options={{
                header: ({ navigation }) => (
                    <ModalHeader navigation={navigation} title={'Login'} />
                )
            }} />
            <Stack.Screen name="Register" component={Register} options={{
                header: ({ navigation }) => (
                    <ModalHeader navigation={navigation} title={'Create an account'} />
                )
            }} />
        </Stack.Navigator >
    )

}

const navigator = (props) => {
    return (
        <NavigationContainer initialState={props.initialState} onStateChange={(state) => {
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }}>
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
