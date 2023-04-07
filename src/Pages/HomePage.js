import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Pressable, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ProductThumbnail from '../Components/ProductThumbnail';
import RouteNames from '../constants/routeNames';
import CategorySeperator from '../Components/CategorySeperator';

const PRODUCTS_ENDPOINT =
  ' https://api.escuelajs.co/api/v1/products?offset=0&limit=30';

const HomePage = ({navigation}) => {
  const Products_axios = async () => {
    // setLoading(true);
    const products = await axios({url: PRODUCTS_ENDPOINT, method: 'get'});
    setProducts(products.data);
    setLoading(false);
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Products_axios();
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: '#7f8fa6'}}>
      <CategorySeperator
        title="Ramadan Offers"
        onPress={() => {
          navigation.navigate(RouteNames.PRODUCTS_LIST, {
            category: 'ramadan',
            name: 'Ramadan',
          });
          // after navigation and passing params you have to check the params in the navigated screen
          // you can either extract the route from props or use the hook useRoute
        }}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        horizontal
        contentContainerStyle={{padding: 10}}
        data={products.slice(0, 10)}
        renderItem={({item, index}) => (
          <ProductThumbnail item={item} index={index - 1} />
        )}
      />
      <CategorySeperator
        title="New Year 2023"
        onPress={() => {
          navigation.navigate(RouteNames.PRODUCTS_LIST, {
            category: 'new year',
            name: 'New Year',
          });
        }}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        horizontal
        contentContainerStyle={{padding: 10}}
        data={products.slice(10, 20)}
        renderItem={({item, index}) => (
          <ProductThumbnail item={item} index={index} />
        )}
      />
      <CategorySeperator
        title="Holidays"
        onPress={() => {
          navigation.navigate(RouteNames.PRODUCTS_LIST, {
            name: 'Holidays',
            category: 'holidays',
          });
        }}
      />
      <FlatList
        style={{flex: 1}}
        horizontal
        contentContainerStyle={{padding: 10}}
        showsHorizontalScrollIndicator={false}
        data={products.slice(20, 30)}
        renderItem={({item, index}) => (
          <ProductThumbnail item={item} index={index - 1} />
        )}
      />
    </ScrollView>
  );
};

export default HomePage;
