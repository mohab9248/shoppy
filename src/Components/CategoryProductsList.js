import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import ProductThumbnail from '../Components/ProductThumbnail';
import axios from 'axios';

const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';

const CategoryProductList = () => {
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
    <View
      style={{
        flex: 1,
        direction: 'rtl',
        display: 'flex',
        marginLeft: 120,
        backgroundColor: '#30336b',
      }}>
      <FlatList
        key={'_'}
        keyExtractor={item => '_' + item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{padding: 10, backgroundColor: '#30336b'}}
        data={products}
        renderItem={({item, index}) => (
          <ProductThumbnail category item={item} index={index - 1} />
        )}
      />
    </View>
  );
};

export default CategoryProductList;
