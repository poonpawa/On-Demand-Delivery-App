import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';

const tabConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
}

const routeConfig = {
    Home: Home
}

const AppNavigator = new createStackNavigator(routeConfig, tabConfig)

export default AppNavigator;