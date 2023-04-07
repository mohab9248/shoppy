import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import ProductThumbnail from '../Components/ProductThumbnail';
import axios from 'axios';

const PRODUCTS_ENDPOINT =
  ' https://api.escuelajs.co/api/v1/products?offset=0&limit=30';

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
    <View style={{flex: 1, direction: 'rtl', display: 'flex', marginLeft: 120}}>
      <FlatList
        key={'_'}
        keyExtractor={item => '_' + item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{padding: 10}}
        data={products.slice(0, 21)}
        renderItem={({item, index}) => (
          <ProductThumbnail item={item} index={index - 1} />
        )}
      />
    </View>
  );
};

export default CategoryProductList;
