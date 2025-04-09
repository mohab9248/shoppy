import React from 'react';
import {Text, View} from 'react-native';

export default function Success({message}) {
  return (
    <View
      style={{
        backgroundColor: 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        padding: 4,
        borderRadius: 4,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{translateX: -80}, {translateY: -10}],
        height: 30,
      }}>
      <Text style={{color: 'white'}}>{message}</Text>
    </View>
  );
}
