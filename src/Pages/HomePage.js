import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView, Pressable} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import ProductThumbnail from '../Components/ProductThumbnail';
import RouteNames from '../constants/routeNames';
import CategorySeperator from '../Components/CategorySeperator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';

const HomePage = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const Products_axios = async () => {
    try {
      const products = await axios({url: PRODUCTS_ENDPOINT, method: 'get'});
      setProducts(products.data);
      console.log(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
    <View style={{flex: 1, backgroundColor: '#30336b'}}>
      <Pressable
        onPress={() => {
          navigation.navigate(RouteNames.SEARCH);
        }}>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            height: 40,
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: '#2980b9',
            borderRadius: 5,
            margin: 1,
          }}>
          <MaterialCommunityIcons name="magnify" color={'white'} size={30} />
          <Text style={{color: 'white', fontSize: 20}}>
            Search For Products
          </Text>
        </View>
      </Pressable>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#30336b'}}>
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
          data={products.slice(0, 10)}
          renderItem={({item, index}) => (
            <ProductThumbnail item={item} index={index - 1} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;
