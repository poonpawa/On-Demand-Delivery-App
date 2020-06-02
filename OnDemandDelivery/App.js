import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import * as Firebase from 'firebase';
import Login from './components/login';
import Home from './components/home';

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
//Firebase.initializeApp(firebaseConfig);


const App = () => {
  const [loggedIn, userLogInState] = useState(false);
  return (
    <View style={styles.container}>
      {loggedIn ? <Home /> : <Login />}
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default App;
