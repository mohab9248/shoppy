import React from 'react';
import {Pressable, Text, Image, StyleSheet, View} from 'react-native';
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
          {_id: item._id},
        );
      }}
      style={[
        styles.card,
        {backgroundColor: index % 2 === 0 ? '#f1f2f6' : '#dfe6e9'},
        containerStyle,
      ]}>
      <Image
        style={[styles.image, imageStyle]}
        resizeMode="cover"
        source={{uri: endpoint + item.image}}
      />
      <View style={styles.details}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[styles.name, textStyle]}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 180,
    margin: 6,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  details: {
    marginTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0984e3',
  },
});
