import React, {useState, useRef, useEffect} from 'react';
import {Text, View, FlatList, Image, useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

function ProductDetails() {
  const {width} = useWindowDimensions();
  const [scrolledIndex, setScrolledIndex] = useState(0);
  const [productsDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    params: {id},
  } = useRoute();
  const getProductDetails = async () => {
    // setLoading(true);
    const product = await axios({
      url: `https://api.escuelajs.co/api/v1/products/${id}`,
      method: 'get',
    });
    console.log(product);
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
  const {title, price, description, category, images} = productsDetails || {};
  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={{flex: 1}}>
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
              style={{width: width, height: width}}
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
      </View>
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
  );
}

export default ProductDetails;
