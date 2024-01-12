import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  Easing,
} from 'react-native';
import {useContext, useEffect, useRef, useState} from 'react';
import {CartContext} from '../navigators/NavBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';

function CartItem({item, deleteItem}) {
  const endpoint = 'http://10.0.2.2:4000/';
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  const [quantity, setQuantity] = useState(1);
  return (
    <Pressable
      onPress={() => {
        // navigate(RouteNames.PRODUCTS_DETAILS, item, );
        navigate({
          name: RouteNames.PRODUCTS_DETAILS,
          params: item,
          key: Math.random(0, 1) + '',
        });
      }}
      style={{
        width: width,
        backgroundColor: '#130f40',
        flexDirection: 'row',
        marginTop: 5,
        padding: 5,
        borderWidth: 4,
        borderColor: '#130f40',
        borderRadius: 7,
      }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 7,
        }}>
        <Image
          style={{
            width: 95,
            height: 95,
          }}
          resizeMode="cover"
          source={{uri: endpoint + item.image[0]}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'black',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ffffff77',
          }}>
          {item.price}$
        </Text>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Text numberOfLines={2} style={{color: 'white'}}>
            {item.name}
          </Text>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: 'grey'}}>
          {item.description}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}>
            <MaterialCommunityIcons
              name="minus"
              color={'black'}
              size={20}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                marginRight: 5,
                marginTop: 5,
              }}
            />
          </Pressable>
          <Text style={{color: 'white', marginTop: 5, marginHorizontal: 5}}>
            {quantity}
          </Text>
          <Pressable
            onPress={() => {
              setQuantity(quantity + 1);
            }}>
            <MaterialCommunityIcons
              name="plus"
              color={'black'}
              size={20}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                marginLeft: 5,
                marginTop: 5,
              }}
            />
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={deleteItem}>
        <MaterialCommunityIcons name="delete" color={'red'} size={32} />
      </Pressable>
    </Pressable>
  );
}
const CartPage = ({setCart}) => {
  const backgroundCart = useRef(new Animated.Value(0))?.current;
  const {navigate} = useNavigation();
  const [i, setI] = useState(false);
  useEffect(() => {
    setI(!i);
    console.log(cartItems);
  }, [cartItems]);

  const cartItems = useContext(CartContext);

  let totalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price,
    0,
  );
  if (cartItems == 0)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#30336b',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20, margin: 5}}>
            Your Cart is Empty
          </Text>
          <MaterialCommunityIcons
            name="cart-remove"
            color={'white'}
            size={32}
          />
        </View>
      </View>
    );
  return (
    <View style={{flex: 1, backgroundColor: '#30336b'}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        data={cartItems}
        renderItem={({item, index}) => (
          <CartItem
            item={item}
            setCart={setCart}
            index={index}
            deleteItem={() => {
              setCart(cart => {
                // previous value from setState is immutable therefore w dont see any change happening
                let cart2 = [...cart]; // .slice()
                // or we can get the index of this item by checking the id
                // let indexofItem = cart2.findIndex(x=>x.id == item.id);

                cart2.splice(index, 1);
                return cart2;
                return [...cart.filter((i, _index) => _index != index)]; // we can use also
              });
            }}
          />
        )}
      />
      <View
        style={{
          backgroundColor: '#4a69bd',
          height: 35,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 17,
            marginLeft: 5,
            color: 'black',
          }}>
          {cartItems.length} items
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: 'black',
          }}>
          Total:
          {`${totalPrice}`?.substring(0, `${totalPrice}`?.indexOf('.') + 4)}$
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#192a56',
          padding: 10,
        }}>
        <Pressable
          onPress={() => {
            Animated.timing(backgroundCart, {
              toValue: 1,
              duration: 1000,
              easing: Easing.bounce,
              useNativeDriver: false,
            }).start();
            navigate(RouteNames.CHECKOUT);
          }}
          style={{
            backgroundColor: '#2980b9',
            width: '70%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Animated.View
            style={{
              backgroundColor: '#bdc3c7',
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
              name="check-bold"
              style={{marginRight: 7}}
              color="#273c75"
              size={20}
            />
            <Text
              style={{
                color: '#273c75',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Checkout
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CartPage;
