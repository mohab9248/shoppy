import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {CartContext} from '../navigators/NavBar';
import {useUser} from '../context/UserContext';
import axios from 'axios';

const API_ENDPOINT = 'http://10.0.2.2:4000/addOrder'; // Replace with your actual backend

const requestLocationPermission = async setRegion => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Shoppy Location Permission',
        message: 'We need your location to add your address.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(info => {
        setRegion({
          ...info.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      });
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const ShowAlert = () => {
  Alert.alert('Success', 'Your order has been submitted!');
};

function CheckoutForm() {
  const {totalCheckout, user} = useUser();
  const cartItems = useContext(CartContext);
  const [fullName, setFullName] = useState(
    `${user.firstName} ${user.lastName}`,
  );
  const [phone, setPhone] = useState(user.phoneNumber);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    requestLocationPermission(setRegion);
  }, []);

  const handleSubmit = async () => {
    if (!address || !phone || !fullName) {
      Alert.alert('Error', 'Please fill all fields and select a location.');
      return;
    }

    try {
      const orderPromises = cartItems.map(item =>
        axios.post(API_ENDPOINT, {
          user_id: user._id,
          product_id: item._id,
          address: `${region.longitude}, ${region.latitude}`,
          phoneNumber: phone,
          quantity: item.quantity,
          total: item.price * item.quantity,
          location: {
            type: 'Point',
            coordinates: [address.longitude, address.latitude],
          },
        }),
      );

      await Promise.all(orderPromises);
      ShowAlert();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit order.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <TextInput
        label="Full Name"
        style={styles.input}
        mode="outlined"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />

      <TextInput
        label="Phone Number"
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={text => setPhone(text)}
      />

      <Text style={styles.label}>Select Delivery Location</Text>
      <View style={styles.mapContainer}>
        {region && (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            onLongPress={({nativeEvent}) => setAddress(nativeEvent.coordinate)}>
            {address && (
              <Marker coordinate={address} title="Delivery Address" />
            )}
          </MapView>
        )}
      </View>

      <Text style={styles.totalText}>Total: ${totalCheckout.toFixed(2)}</Text>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2f3640',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    color: '#2f3640',
    fontWeight: '500',
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#dcdde1',
    borderWidth: 1,
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27ae60',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#273c75',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutForm;
