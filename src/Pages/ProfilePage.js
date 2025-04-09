import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {useUser} from '../context/UserContext';
import {View, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Overlay from '../Components/Overlay';
import UpdateProfile from '../Components/UpdateProfile';
import Success from '../Components/Success';
import UserUpdate from '../Components/UserUpdate';
import EditProfile from '../Components/EditProfile';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';

export default function ProfilePage() {
  const {user, logout} = useUser();
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  return (
    <View style={{flex: 1}}>
      {user ? (
        <>
          <View
            style={{
              height: '100%',
              backgroundColor: 'white',
              position: 'relative',
            }}>
            {open && <Overlay setOpen={setOpen} />}
            {open && <EditProfile setOpen={setOpen} setSuccess={setSuccess} />}
            {success && <Success message="data updated successfully" />}
            <View
              style={{
                backgroundColor: 'white',
                height: '30%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50,
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  backgroundColor: 'gray',
                  borderWidth: 3,
                  borderColor: '#d7d7d7',
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../assets/8742495.png')}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 24}}>
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 24}}>
                {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 40,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Email</Text>
              <Text>{user.email}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Phone</Text>
              <Text>{user.phoneNumber}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
              style={{
                marginTop: 5,
                padding: 5,
                backgroundColor: '#d3d3d3',
                color: 'white',
                marginTop: 100,
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Icon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              style={{
                marginTop: 10,
                padding: 5,
                backgroundColor: '#30336b',
                color: 'white',
                marginTop: 10,
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                height: 50,
              }}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d3d3d3',
          }}>
          <View style={{width: '100%'}}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                Please Login
              </Text>
            </View>

            <Button
              onPress={() => {
                navigation.navigate(RouteNames.ACCOUNTPAGE);
              }}
              mode="contained"
              style={{
                marginBottom: 10,
                borderRadius: 5,
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              Login
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
