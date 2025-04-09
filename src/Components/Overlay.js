import React from 'react';
import {TouchableOpacity, View} from 'react-native';

export default function Overlay({setOpen}) {
  return (
    <TouchableOpacity
      onPress={() => setOpen(false)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 99,
      }}></TouchableOpacity>
  );
}
