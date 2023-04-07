import React from 'react';
import {Pressable, Text, Image} from 'react-native';
import RouteNames from '../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

export default function ProductThumbnail({
  item,
  index,
  containerStyle,
  imageStyle,
  textStyle,
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(RouteNames.PRODUCTS_DETAILS, {id: item.id});
      }}
      style={{
        width: 100,
        height: 160,
        margin: 5,
        flex: 1,
        padding: 2.5,
        borderRadius: 5,
        backgroundColor: index % 2 ? '#bdc3c7' : '#ecf0f1',
        ...containerStyle,
      }}>
      <Image
        style={{
          width: 95,
          height: 95,
          alignSelf: 'center',
          ...imageStyle,
        }}
        resizeMode="cover"
        source={{uri: item.images[0]}}
      />
      <Text
        style={{fontSize: 15, fontWeight: 'bold', ...textStyle}}
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text numberOfLines={1}>
        {item.price}
        <Text style={{fontWeight: 'bold'}}>$</Text>
      </Text>
    </Pressable>
  );
}
