import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/login';
import Register from '../screens/register';

const tabConfig = {
    initialRouteName: 'SignIn',
    header: null,
    headerMode: 'none',
}

const routeConfig = {
    SignIn: Login,
    SignUp: Register
}

const AuthNavigator = new createStackNavigator(routeConfig, tabConfig)

export default AuthNavigator;