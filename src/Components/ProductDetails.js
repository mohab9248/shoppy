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
function ProductDetails(props) {
  const {setCart} = props;
  const {width} = useWindowDimensions();
  const [scrolledIndex, setScrolledIndex] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const cart = useContext(CartContext);
  // const backgroundColourIndex = new Animated.Value(0);
  // const backgroundCart = new Animated.Value(0);
  const backgroundCart = useRef(new Animated.Value(0)).current;

  const {
    params: {id},
  } = useRoute();
  const getProductDetails = async () => {
    // setLoading(true);
    const product = await axios({
      url: `https://fakestoreapi.com/products/${id}`,
      method: 'get',
    });
    product.data.images = [
      product.data.image,
      product.data.image,
      product.data.image,
    ];
    if (cart.find(({id}) => id == product.data.id)) {
      backgroundCart.setValue(1);
    }
    setProductDetails(product.data);
    setLoading(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  console.log(id);
  const onViewChanged = useRef(({viewableItems}) => {
    console.log('Items ', viewableItems);
    if (viewableItems.length > 0) {
      const {index, item} = viewableItems[0];
      setScrolledIndex(index);
    }
  });

  const addToCart = p => () => {
    setCart(cart => [...cart, p]);
    Animated.timing(backgroundCart, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  const {title, price, description, category, image, images} =
    productDetails || {};
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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{width: width, maxHeight: width}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}
            style={{width: '100%', maxHeight: width}}
            data={images}
            viewabilityConfig={{
              waitForInteraction: true,
              viewAreaCoveragePercentThreshold: 60,
            }}
            onViewableItemsChanged={onViewChanged?.current}
            renderItem={({item}) => (
              <Image
                source={{uri: item}}
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
            {images.map((s, index) => (
              <View
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
          }}>
          <View>
            <Text
              style={{
                fontWeight: '900',
              }}>
              {title}
            </Text>
          </View>
          <View>
            <Text>{description}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: '900',
              }}>
              {price}$
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
          disabled={!!cart.find(({id}) => id === productDetails?.id)}
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
