import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {CartContext} from '../navigators/NavBar';
import {useContext} from 'react';
import {useUser} from '../context/UserContext';
import RouteNames from '../constants/routeNames';
const requestLocationPermission = async setRegion => {
  let location = null;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Shoppy Location Permission',
        message: 'we need your location ' + 'so you can add your address',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Location');
      location = Geolocation.getCurrentPosition(info => {
        console.log(info);
        setRegion({
          ...info.coords,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
        return info.coords;
      });
      return location;
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  } finally {
    return location;
  }
};
const ShowAlert = () => {
  Alert.alert('Your Order Has Been Submited');
};
function CheckoutForm() {
  const {totalCheckout, user} = useUser();
  const [FullName, setFullName] = useState(
    user.firstName + ' ' + user.lastName,
  );
  const [phone, setPhone] = useState(user.phoneNumber);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState(null);

  const getCurrentLocation = async () => {
    const Location = await requestLocationPermission(setRegion);
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const cartItems = useContext(CartContext);
  let totalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price,
    0,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
        <Text style={{color: 'black', fontSize: 25}}>Fill the Progress</Text>
      </View>
      <TextInput
        style={styles.TextInput}
        mode="flat"
        placeholder="Enter your Full name"
        value={FullName}
        onChangeText={FullName => setFullName(FullName.toString())}
      />
      <Text></Text>
      <TextInput
        style={styles.TextInput}
        mode="flat"
        placeholder="Enter your number"
        value={phone}
        onChangeText={phone => setPhone(phone.toString())}
      />

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            fontSize: 17,
          }}>
          Please choose Location
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          margin: 20,
          borderWidth: 3,
          borderRadius: 2,
          borderColor: 'white',
        }}>
        {region && (
          <MapView
            style={{
              justifyContent: 'center',
              width: 300,
              height: 200,
            }}
            showsUserLocation={true}
            minZoomLevel={5}
            maxZoomLevel={15}
            loadingEnabled
            region={region}
            onLongPress={({nativeEvent: {coordinate}}) => {
              setAddress(coordinate);
            }}>
            {address && <Marker coordinate={address} title={'address'} />}
          </MapView>
        )}
      </View>
      <View
        style={{
          display: 'flex',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
          }}>
          Total: {totalCheckout}$
        </Text>
      </View>
      <View
        style={{
          width: 250,
          height: 50,
          borderRadius: 5,
          backgroundColor: '#273c75',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 35,
        }}>
        <Pressable
          onPress={() => {
            ShowAlert();
          }}>
          <Text
            style={{textTransform: 'uppercase', fontSize: 22, color: 'white'}}>
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  TextInput: {
    margin: 5,
    height: 40,
    width: '90%',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 5,
  },
});
export default CheckoutForm;
