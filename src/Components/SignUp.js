import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useEffect, useState} from 'react';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
import {useUser} from '../context/UserContext';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const REGISTER_ENDPOINT = 'http://10.0.2.2:4000/register';
  const {login} = useUser();
  const handleSignup = () => {
    setLoading(true);
    fetch(`${REGISTER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Signup failed!');
        }
        return response.json();
      })
      .then(data => {
        login(data.user);
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess('');
        }, 2000);
        setTimeout(() => {
          navigation.navigate(RouteNames.HOME);
        }, 3000);

        console.log('Signup successful!', data);
      })
      .catch(error => {
        console.error('Error during signup:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        <Text style={{color: 'black', fontSize: 25}}>Welcome To Shoppy</Text>
      </View>

      <TextInput
        style={styles.TextInput}
        mode="flat"
        placeholder="Enter your firstname"
        value={firstName}
        onChangeText={FirstName => setFirstName(FirstName.toString())}
      />
      <TextInput
        style={styles.TextInput}
        mode="flat"
        placeholder="Enter your lastname"
        value={lastName}
        onChangeText={LastName => setLastName(LastName.toString())}
      />

      <TextInput
        style={styles.TextInput}
        s
        mode="flat"
        placeholder="Enter your email"
        value={email}
        onChangeText={Email => setEmail(Email.toString())}
      />
      <TextInput
        style={styles.TextInput}
        mode="flat"
        placeholder="Enter your phone"
        value={phoneNumber}
        onChangeText={phone => setPhoneNumber(phone.toString())}
      />
      <TextInput
        style={styles.TextInput}
        mode="flat"
        secureTextEntry
        value={password}
        placeholder="Enter your password"
        onChangeText={password => setPassword(password.toString())}
      />

      <Button
        mode="contained"
        onPress={() => {
          handleSignup();
        }}
        style={{
          margin: 10,
          width: '90%',
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? <ActivityIndicator size="small" color="orange" /> : 'Signup'}
      </Button>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          width: '90%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginRight: 5,
          }}>
          Already have an account?
        </Text>
        {}
        <Pressable
          onPress={() => {
            navigation.navigate(RouteNames.ACCOUNT);
          }}>
          <Text style={{color: 'blue'}}>Login</Text>
        </Pressable>
      </View>
      <View style={{width: '90%', marginRight: 'auto', marginLeft: 'auto'}}>
        {success && <Text style={{color: 'green'}}>{success}</Text>}
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
