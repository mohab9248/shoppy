import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function Product({id, images, title, price}) {
  return (
    <View style={[styles.item, styles.center]}>
      <Text style={styles.title}>{title} </Text>
      <Text style={styles.price}>{price}$</Text>
      <Image
        style={{width: 100, height: 100}}
        resizeMode="contain"
        source={{
          uri: `${images?.[0]}`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
  },
  title: {
    fontSize: 15,
  },
  price: {
    color: 'black',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Product;
