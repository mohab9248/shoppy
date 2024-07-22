// QuantityDisplay.js

import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const QuantityDisplay = () => {
  const quantity = useSelector(state => state.product.quantity);

  return (
    <View>
      <Text>{quantity}</Text>
    </View>
  );
};

export default QuantityDisplay;
