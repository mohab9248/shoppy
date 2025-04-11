import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchProduct from '../Components/SearchProduct';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const category = false;

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:4000/getAllCategory');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:4000/product');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchedQuery]);

  const filterProducts = () => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(
        product => product.category_id._id === selectedCategory,
      );
    }
    if (searchedQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()),
      );
    }
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId);
  };

  const renderProduct = ({item}) => (
    <Pressable
      style={styles.productCard}
      onPress={() => {
        navigation.navigate(
          category
            ? RouteNames.CATEGORY_PRODUCTS_DETAILS
            : RouteNames.PRODUCTS_DETAILS,
          {_id: item._id},
        );
      }}>
      <Image
        resizeMode="cover"
        style={styles.productImage}
        source={{uri: 'http://10.0.2.2:4000/' + item.image}}
      />
      <Icon name="star" size={16} color="#FFD700" style={styles.star} />
      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.productPrice}>{item.price}$</Text>
      </View>
    </Pressable>
  );

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <SearchProduct
        setSearchedQuery={setSearchedQuery}
        searchedQuery={searchedQuery}
      />

      <View style={styles.categoryHeader}>
        <TouchableOpacity
          onPress={() => {
            setFilteredProducts(products);
            setSearchedQuery('');
            setSelectedCategory(null);
          }}
          style={styles.allBtn}>
          <Text style={styles.allBtnText}>All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity
            key={category._id}
            onPress={() => handleCategorySelect(category._id)}
            style={[
              styles.categoryItem,
              selectedCategory === category._id && styles.categoryItemActive,
            ]}>
            <Image
              source={{uri: 'http://10.0.2.2:4000/' + category.image}}
              style={styles.categoryImage}
            />
            <Text numberOfLines={1} style={styles.categoryText}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        ref={flatListRef}
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryHeader: {
    marginTop: 10,
    marginBottom: 5,
  },
  allBtn: {
    backgroundColor: '#dfe6e9',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  allBtnText: {
    fontWeight: '600',
    color: '#2d3436',
  },
  categoryScroll: {
    marginBottom: 16,
    marginTop: 10,
  },
  categoryItem: {
    backgroundColor: '#dcdde1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    minWidth: 100,
    height: 40,
  },
  categoryItemActive: {
    backgroundColor: '#74b9ff',
  },
  categoryImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '600',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  star: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#0984e3',
  },
});

export default CategoryPage;
