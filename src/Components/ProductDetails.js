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
  StyleSheet,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useRoute, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartContext} from '../navigators/NavBar';
import endpoint from '../constants/Endpoints';
function ProductDetails({setCart}) {
  const endpoints = `http://${endpoint}/`;
  const {width} = useWindowDimensions();
  const [scrolledIndex, setScrolledIndex] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const cart = useContext(CartContext);
  const [quant, setQuant] = useState(1);
  const backgroundCart = useRef(new Animated.Value(0)).current;

  const {
    params: {_id},
  } = useRoute();
  const navigation = useNavigation();

  const getProductDetails = async () => {
    const res = await axios.get(`http://${endpoint}/product/${_id}`);
    res.data.image = [res.data.image, res.data.image, res.data.image];
    if (cart.find(({_id}) => _id === res.data._id)) {
      backgroundCart.setValue(1);
    }
    setProductDetails(res.data);
    setQuant(res.data.quantity);
    setLoading(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    navigation.setParams({quant});
  }, [quant, navigation]);

  const addToCart = p => () => {
    setCart(prev => [...prev, p]);
    Animated.timing(backgroundCart, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const onViewChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setScrolledIndex(viewableItems[0].index);
    }
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e67e22" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Carousel */}
        <View style={{width, maxHeight: width}}>
          <FlatList
            data={productDetails.image}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onViewChanged.current}
            viewabilityConfig={{
              waitForInteraction: true,
              viewAreaCoveragePercentThreshold: 60,
            }}
            renderItem={({item}) => (
              <Image
                source={{uri: endpoints + item}}
                resizeMode="contain"
                style={{width, height: width * 0.85}}
              />
            )}
          />
          <View style={styles.pagination}>
            {productDetails.image.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  scrolledIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{productDetails.name}</Text>
          <Text style={styles.description}>{productDetails.description}</Text>
          <Text style={styles.price}>${productDetails.price}</Text>
        </View>
      </ScrollView>

      {/* Add to Cart */}
      <View style={styles.addToCartWrapper}>
        <Pressable
          style={styles.addToCartBtn}
          onPress={addToCart(productDetails)}
          disabled={!!cart.find(({_id}) => _id === productDetails._id)}>
          <Animated.View
            style={[
              styles.addedOverlay,
              {
                width: backgroundCart.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                height: backgroundCart.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                opacity: backgroundCart.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}
          />
          <View style={styles.addToCartContent}>
            <MaterialCommunityIcons
              name="cart-plus"
              color="#fff"
              size={20}
              style={{marginRight: 10}}
            />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: '#333',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 22,
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#e67e22',
  },
  addToCartWrapper: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  addToCartBtn: {
    backgroundColor: '#e67e22',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addedOverlay: {
    position: 'absolute',
    backgroundColor: '#27ae60',
    borderRadius: 10,
    zIndex: 1,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
