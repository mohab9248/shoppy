import React from 'react';
import {View, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategorySeperator = ({title, onPress}) => {
  return (
    <View
      style={{
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        backgroundColor: '#130f40',
      }}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
      <Pressable onPress={onPress}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          View All <MaterialCommunityIcons name="arrow-right" color={'white'} />
        </Text>
      </Pressable>
    </View>
  );
};
export default CategorySeperator;
