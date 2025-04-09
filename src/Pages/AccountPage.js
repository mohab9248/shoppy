import {Text, View, StyleSheet, Pressable} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
import axios from 'axios';
import {useUser} from '../context/UserContext';

const LOGIN_ENDPOINT = 'http://10.0.2.2:4000/login';
const AccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {login} = useUser();

  const handleLogin = () => {
    fetch(`${LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed!');
        }
        return response.json();
      })
      .then(data => {
        const {user} = data;
        login(user);

        console.log('Login successful!', user);
        setTimeout(() => {
          navigation.navigate(RouteNames.Profile);
        }, 2000);
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
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
            Welcome Back
          </Text>
        </View>

        <View style={{width: '100%'}}>
          <TextInput
            style={styles.TextInput}
            mode="flat"
            placeholder="Enter your Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.TextInput}
            mode="flat"
            placeholder="Enter your password"
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={{
              marginBottom: 10,
              borderRadius: 5,
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            Login
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              marginRight: 5,
            }}>
            Don't have an account?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate(RouteNames.SIGNUP);
            }}>
            <Text style={{color: 'blue'}}>SignUp</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 40,
    width: '90%',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    paddingLeft: '50%',
  },
});
export default AccountPage;
