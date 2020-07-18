import React, { useEffect } from 'react';
import Navigator from './navigation/navigator';
import firebase from '@react-native-firebase/app';

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

  return (
    <Navigator />
  )
};

export default App;
