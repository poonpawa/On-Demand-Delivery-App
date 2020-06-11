import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from '../screens/loading';
import AppNavigator from '../navigation/app-navigator'
import AuthNavigator from '../navigation/auth-navigator'

const rootNavigator = createSwitchNavigator(
    {
        Loading: {
            screen: Loading
        },
        App: AppNavigator,
        Auth: AuthNavigator
    },
    {
        initialRouteName: 'Loading'
    }
);

export default createAppContainer(rootNavigator);