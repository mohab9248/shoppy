import {Text, View, StyleSheet, Pressable} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
      .then(response => {
        if (!response.ok) throw new Error('Login failed!');
        return response.json();
      })
      .then(data => {
        login(data.user);
        setTimeout(() => navigation.navigate(RouteNames.Profile), 2000);
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          contentStyle={{paddingVertical: 6}}>
          Login
        </Button>

        <View style={styles.footer}>
          <Text style={{color: '#555'}}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate(RouteNames.SIGNUP)}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    color: '#2d3436',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 14,
  },
  button: {
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#0984e3',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupLink: {
    color: '#0984e3',
    fontWeight: '600',
  },
});

export default AccountPage;
