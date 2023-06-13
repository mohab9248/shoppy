import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from './src/navigators/NavBar';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
const App = () => {
  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  );
};

export default App;
