import React from 'react';
import {Pressable, Text, Image} from 'react-native';
import RouteNames from '../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

export default function ProductThumbnail({
  item,
  category = false,
  index,
  containerStyle,
  imageStyle,
  textStyle,
}) {
  const endpoint = 'http://10.0.2.2:4000/';
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(
          category
            ? RouteNames.CATEGORY_PRODUCTS_DETAILS
            : RouteNames.PRODUCTS_DETAILS,
          // RouteNames[
          //   category ? 'CATEGORY_PRODUCT_DETAILS' : 'PRODUCTS_DETAILS'
          // ],
          {_id: item._id},
        );
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
        source={{
          uri: endpoint + item.image,
        }}
      />
      <Text
        style={{fontSize: 15, fontWeight: 'bold', ...textStyle}}
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text numberOfLines={1}>
        {item.price}
        <Text style={{fontWeight: 'bold'}}>$</Text>
      </Text>
    </Pressable>
  );
}
