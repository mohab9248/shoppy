import {
  View,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
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
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:4000/product');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
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

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const renderProduct = ({item}) => (
    <Pressable
      style={styles.productContainer}
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
      }}>
      <View style={{width: '100%', height: 100}}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            borderRadius: 6,

            marginRight: 8,
          }}
          source={{
            uri: 'http://10.0.2.2:4000/' + item.image,
          }}
        />
        <Icon name="star" size={15} color="#FFD700" style={styles.star} />
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, paddingRight: 8}}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontWeight: 'bold', fontSize: 16}}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </View>
        <Text style={{color: 'black', fontWeight: 'bold', margin: 5}}>
          {item.price}$
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <SearchProduct
        setSearchedQuery={setSearchedQuery}
        searchedQuery={searchedQuery}
      />
      <View
        style={{
          justifyContent: 'center',
          paddingLeft: 10,
          height: 30,
          paddingTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setFilteredProducts(products);
            setSearchedQuery('');
            setSelectedCategory(null);
          }}
          style={{
            width: 80,
            backgroundColor: '#d3d3d3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            height: 25,
          }}>
          <Text style={{fontWeight: 'bold'}}>All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 20,
          marginBottom: 20,
        }}>
        {categories.map(category => (
          <TouchableOpacity
            key={category._id}
            style={{marginBottom: 20}}
            onPress={() => {
              handleCategorySelect(category._id);
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginEnd: 5,
                backgroundColor: '#d7d7d7',
                padding: 6,
                borderRadius: 10,
                marginBottom: 10,
                width: 100,
              }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginRight: 8,
                }}
                source={{
                  uri: 'http://10.0.2.2:4000/' + category.image,
                }}
              />
              <Text style={{fontSize: 14, color: '#333'}}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        style={{gap: 3}}
        ref={flatListRef}
        data={filteredProducts}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
        initialScrollIndex={0}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  productContainer: {
    width: 160,
    maxWidth: '100%',
    margin: 10,
    height: 140,
    overflow: 'hidden',
    gap: 2,
    borderRadius: 8,
    alignItems: 'center',
    position: 'relative',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  flatListContent: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: 400,
    minWidth: '100%',
  },
  star: {
    position: 'absolute',
    top: 5,
    right: 4,
  },
});
export default CategoryPage;
