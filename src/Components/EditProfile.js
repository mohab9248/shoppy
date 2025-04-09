import React, {useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUser} from '../context/UserContext';
import {TextInput} from 'react-native-paper';

export default function EditProfile({setOpen, setSuccess}) {
  const {user, setUser} = useUser();
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    setError('');

    const updatedData = {
      firstName,
      lastName,
      phoneNumber,
      password,
    };

    try {
      const response = await fetch(
        `http://10.0.2.2:4000/userUpdates/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setOpen(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        console.log('Update successful:', data);
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (error) {
      setError('Error updating profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{translateX: -150}, {translateY: -100}],
        width: '80%',
        height: 'auto',
        paddingBottom: 10,
        backgroundColor: 'white',
        zIndex: 100,
        borderRadius: 8,
        display: 'flex',
        gap: 4,
      }}>
      <View
        style={{
          width: '100%',
          paddingTop: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          Update Profile
        </Text>
        <View
          style={{
            width: '100%',
            paddingLeft: 10,
            marginTop: 10,
            paddingRight: 10,
            display: 'flex',
            gap: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '48%'}}>
              <Text style={{color: 'black'}}>FirstName</Text>
              <TextInput
                placeholder="Your New Firstname"
                value={firstName}
                onChangeText={first => setFirstName(first.toString())}
                style={{
                  backgroundColor: '#d7d7d7',
                  height: 40,
                  borderBottomWidth: 2,
                  borderBottomColor: '#30336b',
                  borderRadius: 6,
                }}
              />
            </View>
            <View style={{width: '48%'}}>
              <Text style={{color: 'black'}}>LastName</Text>
              <TextInput
                placeholder="Enter your lastName "
                value={lastName}
                onChangeText={last => setLastName(last.toString())}
                style={{
                  backgroundColor: '#d7d7d7',
                  height: 40,
                  borderBottomWidth: 2,
                  borderBottomColor: '#30336b',
                  borderRadius: 6,
                }}
              />
            </View>
          </View>
          <View style={{display: 'flex', gap: 2}}>
            <Text style={{color: 'black'}}>Phone</Text>
            <TextInput
              placeholder="Enter your Phone "
              value={phoneNumber}
              onChangeText={phone => setPhoneNumber(phone.toString())}
              style={{
                backgroundColor: '#d7d7d7',
                height: 40,
                borderBottomWidth: 2,
                borderBottomColor: '#30336b',
                borderRadius: 6,
              }}
            />
          </View>
          <View style={{display: 'flex', gap: 2}}>
            <Text style={{color: 'black'}}>Password</Text>
            <TextInput
              placeholder="Enter your password "
              value={password}
              onChangeText={pass => setPassword(pass.toString())}
              style={{
                backgroundColor: '#d7d7d7',
                height: 40,
                borderBottomWidth: 2,
                borderBottomColor: '#30336b',
                borderRadius: 6,
              }}
            />
          </View>
          {error ? <Text>{error}</Text> : null}

          <View style={{marginTop: 6}}>
            <TouchableOpacity
              onPress={handleUpdate}
              style={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#30336b',
                borderRadius: 6,
                padding: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {loading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
