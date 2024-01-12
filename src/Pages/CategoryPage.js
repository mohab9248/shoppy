import {View, FlatList, Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useEffect, useState} from 'react';
import ProductThumbnail from '../Components/ProductThumbnail';
import CategorySideBar from '../Components/CategorySideBar';
const {width, height} = Dimensions.get('window');
const PRODUCTS_ENDPOINT = 'http://10.0.2.2:4000/productByCategories/';
const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const getCategories = async () => {
    const cats = await axios({
      url: 'http://10.0.2.2:4000/getAllCategory',
      method: 'get',
    });
    setCategories(cats.data);
    cats.data.length &&
      selectedCategory == null &&
      setSelectedCategory(cats.data);
  };
  const getProducts = async () => {
    // setLoading(true);
    const products = await axios({
      url:
        PRODUCTS_ENDPOINT +
        selectedCategory.map(s => {
          return s._id;
        }),
      method: 'get',
    });

    setProducts(products.data);
    setLoading(false);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);
  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#30336b',
      }}>
      <CategorySideBar
        categories={categories}
        changeSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <FlatList
        style={{maxWidth: width * 0.65, width: width * 0.65}}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#30336b',
        }}
        data={products}
        renderItem={({item, index}) => (
          <ProductThumbnail
            category
            containerStyle={{
              width: 100,
              height: 160,
              margin: 5,
              flex: 1,
              padding: 2.5,
              borderRadius: 5,
              backgroundColor: '#bdc3c7',
            }}
            imageStyle={{width: '100%'}}
            item={item}
            index={index - 1}
          />
        )}
      />
    </View>
  );
};

export default CategoryPage;
0;
