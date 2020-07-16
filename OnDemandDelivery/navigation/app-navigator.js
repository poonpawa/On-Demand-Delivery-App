import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Store from '../screens/store';
import Category from '../screens/category';
import Product from '../screens/product';

const tabConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
}

const routeConfig = {
    Home: Home,
    Store: Store,
    Category: Category,
    Product: Product
}

const AppNavigator = new createStackNavigator(routeConfig, tabConfig)

export default AppNavigator;