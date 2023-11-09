import {Text, View, StyleSheet, Pressable} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
import axios from 'axios';
const LOGIN_ENDPOINT = 'https:/localhost:5000/api/auth/login';
const AccountPage = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const Login = async () => {
    await axios.post(LOGIN_ENDPOINT, {
      username: username,
      password: password,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#30336b',
      }}>
      <TextInput
        style={styles.TextInput}
        mode="flat"
        label="username"
        value={username}
        onChangeText={username => setName(username)}
      />
      <TextInput
        style={styles.TextInput}
        mode="flat"
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button mode="contained" onPress={() => Login()} style={{margin: 10}}>
        Login
      </Button>
      <View style={styles.lineStyle} />
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
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
  );
};

const styles = StyleSheet.create({
  TextInput: {
    margin: 5,
    width: 250,
    justifyContent: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    paddingLeft: '50%',
  },
});
export default AccountPage;
