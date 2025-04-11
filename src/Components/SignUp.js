import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useState} from 'react';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
import {useUser} from '../context/UserContext';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const REGISTER_ENDPOINT = 'http://10.0.2.2:4000/register';
  const {login} = useUser();

  const handleSignup = () => {
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    fetch(`${REGISTER_ENDPOINT}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Signup failed!');
        return response.json();
      })
      .then(data => {
        login(data.user);
        setSuccess(data.message);
        setTimeout(() => setSuccess(''), 2000);
        setTimeout(() => navigation.navigate(RouteNames.HOME), 3000);
        console.log('Signup successful!', data);
      })
      .catch(error => {
        console.error('Error during signup:', error);
        setError('Signup failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Re-enter Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}

        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          contentStyle={{paddingVertical: 6}}>
          {loading ? <ActivityIndicator color="white" /> : 'Sign Up'}
        </Button>

        <View style={styles.footer}>
          <Text style={{color: '#555'}}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate(RouteNames.ACCOUNT)}>
            <Text style={styles.loginLink}> Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

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
    padding: 20,
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
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#0984e3',
  },
  footer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    color: '#0984e3',
    fontWeight: '600',
  },
  success: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
});
