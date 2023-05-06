import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import {CartContext} from '../navigators/NavBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CartItem({item, deleteItem}) {
  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        width: width,
        backgroundColor: 'grey',
        flexDirection: 'row',
        padding: 5,
      }}>
      <View style={{}}>
        <Image
          style={{
            width: 95,
            height: 95,
          }}
          resizeMode="cover"
          source={{uri: item.image}}
        />
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          {item.price}$
        </Text>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Text style={{color: 'white'}}>{item.title}</Text>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={{color: 'black'}}>
          {item.description}
        </Text>
      </View>
      <Pressable
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={deleteItem}>
        <MaterialCommunityIcons name="delete" color={'black'} size={32} />
      </Pressable>
    </View>
  );
}
const CartPage = ({setCart, ...rest}) => {
  const {width} = useWindowDimensions();
  const [i, setI] = useState(false);
  useEffect(() => {
    console.log('hello');
    setI(!i);
  }, [cartItems]);

  const cartItems = useContext(CartContext);
  return (
    <View style={{flex: 1}}>
      <Text>Cart Page</Text>
      <FlatList
        style={{flex: 1}}
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
    </View>
  );
};

export default CartPage;
