import {Text, View, StyleSheet, Pressable} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
import axios from 'axios';

const LOGIN_ENDPOINT = 'http://10.0.2.2:4000/user';
const AccountPage = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const Login = async () => {
    const response = await axios.get(LOGIN_ENDPOINT);
    const users = response.data;
    if (users.email === username && users.password) {
    }
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
      <Button
        mode="contained"
        onPress={() => {
          Login();
          navigation.navigate(RouteNames.USER);
        }}
        style={{margin: 10}}>
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
