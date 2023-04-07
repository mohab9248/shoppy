import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from './src/navigators/NavBar';
const App = () => {
  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  );
};

export default App;
