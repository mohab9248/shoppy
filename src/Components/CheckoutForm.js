import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, Pressable, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';

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
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState(null);
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const getCurrentLocation = async () => {
    const Location = await requestLocationPermission(setRegion);
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const navigate = useNavigation();
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={{margin: 5, width: 170, justifyContent: 'center'}}
          mode="outlined"
          label=" First Name"
          autoCapitalize="words"
          value={FirstName}
          onChangeText={() => {
            setFirstName(FirstName);
          }}
        />
        <TextInput
          style={{margin: 5, width: 170, justifyContent: 'center'}}
          mode="outlined"
          label=" Last Name"
          autoCapitalize="words"
          value={LastName}
          onChangeText={() => {
            setLastName(LastName);
          }}
        />
      </View>
      <View style={{borderWidth: 3, borderRadius: 2, borderColor: 'white'}}>
        {region && (
          <MapView
            style={{
              width: '100%',
              height: 300,
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
            ShowAlert(), console.log(LastName);
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

export default CheckoutForm;
