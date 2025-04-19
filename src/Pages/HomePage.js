import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView, Pressable, StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import ProductThumbnail from '../Components/ProductThumbnail';
import RouteNames from '../constants/routeNames';
import CategorySeperator from '../Components/CategorySeperator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PRODUCTS_ENDPOINT = 'http://10.0.2.2:4000/product';
const CATEGORIES_ENDPOINT = 'http://10.0.2.2:4000/getAllCategory';

const HomePage = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const Products_axios = async () => {
    try {
      const response = await axios.get(PRODUCTS_ENDPOINT);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_ENDPOINT);
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories', error);
    }
  };

  useEffect(() => {
    Products_axios();
    fetchCategories();
  }, []);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00cec9" />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Pressable onPress={() => navigation.navigate(RouteNames.SEARCH)}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" color={'white'} size={28} />
          <Text style={styles.searchText}>Search Products</Text>
        </View>
      </Pressable>

      {/* Category Sections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(category => {
          const productsInCategory = products.filter(
            product =>
              product.category_id?.name?.toLowerCase?.() ===
              category.name.toLowerCase(),
          );

          if (productsInCategory.length === 0) return null;

          return (
            <View key={category._id} style={styles.categoryContainer}>
              <CategorySeperator
                title={category.name}
                onPress={() => {
                  navigation.navigate(RouteNames.CATEGORYPAGE, {
                    categoryId: category._id,
                    name: category.name,
                  });
                }}
              />
              <FlatList
                horizontal
                data={productsInCategory}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.productList}
                renderItem={({item, index}) => (
                  <ProductThumbnail item={item} index={index} />
                )}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0984e3',
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  searchText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: '#130f40',
    paddingBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  productList: {
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10, // Add spacing between items
  },
});

export default HomePage;
