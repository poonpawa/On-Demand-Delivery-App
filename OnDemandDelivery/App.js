import React, { useState, useEffect } from 'react';
import {
  StyleSheet
} from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from '@react-native-firebase/app';
import Loading from './components/loading';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';

const App = () => {

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyDVjd53HtkWR5FtZqY3xJdeKrhQhGU03oA",
      authDomain: "deliverydb-5d01d.firebaseapp.com",
      databaseURL: "https://deliverydb-5d01d.firebaseio.com",
      projectId: "deliverydb-5d01d",
      storageBucket: "deliverydb-5d01d.appspot.com",
      messagingSenderId: "951086271432",
      appId: "1:951086271432:web:1f84b328c4cc0b2cc04efd",
      measurementId: "G-7KEF5GWFL6"
    };
    // Initialize Firebase
    if (!firebase) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

const AppStack = createStackNavigator({
  Home: Home
})

const AuthStack = createStackNavigator({
  SignIn: Login,
  SignUp: Register
})

const navigationConfig = createSwitchNavigator(
  {
    Loading: {
      screen: Loading
    },
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Loading'
  }
)

export default createAppContainer(navigationConfig);
