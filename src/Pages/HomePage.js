import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ProductThumbnail from '../Components/ProductThumbnail';
import RouteNames from '../constants/routeNames';
import CategorySeperator from '../Components/CategorySeperator';

const PRODUCTS_ENDPOINT = 'https://api.escuelajs.co/api/v1/products';

const HomePage = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const Products_axios = async () => {
    try {
      const products = await axios({url: PRODUCTS_ENDPOINT, method: 'get'});
      console.log(products);
      setProducts(products.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // setLoading(true);
  };

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
      style={{flex: 1, backgroundColor: 'white'}}>
      <CategorySeperator
        title="Men"
        onPress={() => {
          navigation.navigate(RouteNames.PRODUCTS_LIST, {
            category: 'Men',
            name: 'Men',
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
        title="Women"
        onPress={() => {
          navigation.navigate(RouteNames.PRODUCTS_LIST, {
            category: 'Women',
            name: 'Women',
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
        title="Kids"
        onPress={() => {
          navigation.navigate(RouteNames.PRODUCTS_LIST, {
            name: 'Kids',
            category: 'Kids',
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
