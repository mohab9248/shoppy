import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartContext} from '../navigators/NavBar';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
function ProductDetails({setCart, route, navigation}) {
  const endpoint = 'http://10.0.2.2:4000/';

  const {width} = useWindowDimensions();
  const [scrolledIndex, setScrolledIndex] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const cart = useContext(CartContext);
  const [quant, setQuant] = useState(1);
  const [categories, setCategories] = useState([]);

  // const backgroundColourIndex = new Animated.Value(0);
  // const backgroundCart = new Animated.Value(0);
  const backgroundCart = useRef(new Animated.Value(0)).current;
  const getCategories = async () => {
    const cats = await axios({
      url: 'http://10.0.2.2:4000/getAllCategory',
      method: 'get',
    });

    const categs = () => {
      return cats.data.map(res => {
        return res._id;
      });
    };

    console.log(categs());
  };
  const {
    params: {_id},
  } = useRoute();
  const getProductDetails = async () => {
    // setLoading(true);
    const product = await axios({
      url: `http://10.0.2.2:4000/product/${_id}`,
      method: 'get',
    });
    product.data.image = [
      product.data.image,
      product.data.image,
      product.data.image,
    ];
    if (cart.find(({_id}) => _id == product.data._id)) {
      backgroundCart.setValue(1);
    }

    setProductDetails(product.data);
    setQuant(product.data.quantity);
    console.log(product.data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
    getProductDetails();
  }, []);

  const onViewChanged = useRef(({viewableItems}) => {
    console.log('Items ', viewableItems);
    if (viewableItems.length > 0) {
      const {index, item} = viewableItems[0];
      setScrolledIndex(index);
    }
  });
  useEffect(() => {
    // Update the params when quantity changes
    navigation.setParams({quant});
  }, [quant, navigation]);
  const addToCart = p => () => {
    setCart(cart => [...cart, p]);

    Animated.timing(backgroundCart, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <View style={{width: width, maxHeight: width}}>
          <FlatList
            keyExtractor={(item, index) => '' + index}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}
            style={{width: '100%', maxHeight: width}}
            data={productDetails.image}
            viewabilityConfig={{
              waitForInteraction: true,
              viewAreaCoveragePercentThreshold: 60,
            }}
            onViewableItemsChanged={onViewChanged?.current}
            renderItem={({item}) => (
              <Image
                source={{uri: endpoint + item}}
                resizeMode="contain"
                style={{width: width, height: width * 0.8}}
              />
            )}
          />
          <View
            style={{
              width,
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              opacity: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {productDetails.image.map((s, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  margin: 5,
                  opacity: index == scrolledIndex ? 1 : 0.5,
                  backgroundColor: 'black',
                  borderRadius: 5,
                  overflow: 'hidden',
                }}
              />
            ))}
          </View>
          {/* <Image
            source={{uri: image}}
            style={{
              width: '100%',
              height: '100%',
            }}
          /> */}
        </View>
        <View
          style={{
            padding: 10,
            margin: 5,
          }}>
          <View
            style={{
              margin: 3,
            }}>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 18,
              }}>
              {productDetails.name}
            </Text>
          </View>
          <View
            style={{
              margin: 3,
            }}>
            <Text>{productDetails.description}</Text>
          </View>
          <View
            style={{
              margin: 3,
            }}>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 18,
              }}>
              {productDetails.price}$
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e67e22',
          padding: 10,
        }}>
        <Pressable
          disabled={!!cart.find(({_id}) => _id === productDetails?._id)}
          style={{
            backgroundColor: '#d35400',
            width: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
          }}
          onPress={addToCart(productDetails)}>
          <Animated.View
            style={{
              backgroundColor: 'green',
              width: backgroundCart.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              height: backgroundCart.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              borderRadius: 100,
              opacity: backgroundCart.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              position: 'absolute',
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              flexDirection: 'row',
            }}></Animated.View>
          <View
            style={{
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name="cart-plus"
              style={{marginRight: 10}}
              color="#e67e22"
              size={20}
            />
            <Text
              style={{
                color: '#e67e22',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Add To Cart
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default ProductDetails;
