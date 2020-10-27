import React, { useEffect } from 'react';
import Navigator from './navigation/navigator';
import firebase from '@react-native-firebase/app';
import { createStore } from "redux";
import Reducer from './store/reducer';
import { Provider } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  useEffect(() => {
    const restoreState = async () => {
      try {     
          const savedStateString = await AsyncStorage.getItem('NAVIGATION_STATE');
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }

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
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const store = createStore(Reducer)

  return (
    <Provider store={store}>
      <Navigator initialState={initialState}/>
    </Provider>
  )
};

export default App;
