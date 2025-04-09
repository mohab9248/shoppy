import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from './src/navigators/NavBar';
import {enableLatestRenderer} from 'react-native-maps';
import {UserProvider} from './src/context/UserContext';

enableLatestRenderer();
const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
