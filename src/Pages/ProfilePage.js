import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput as RNTextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useUser} from '../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Overlay from '../Components/Overlay';
import EditProfile from '../Components/EditProfile';
import Success from '../Components/Success';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';
const LOGIN_ENDPOINT = 'http://10.0.2.2:4000/login';

const ProfilePage = () => {
  const {user, login, logout} = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();
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
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  if (!user) {
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
  }

  return (
    <View style={styles.container}>
      {open && <Overlay setOpen={setOpen} />}
      {open && <EditProfile setOpen={setOpen} setSuccess={setSuccess} />}
      {success && <Success message="Data updated successfully!" />}

      <View style={styles.profileSection}>
        <Image
          source={require('../assets/8742495.png')}
          style={styles.avatar}
        />
        <Text style={styles.nameText}>
          {`${
            user.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1)
          } ${
            user.lastName?.charAt(0).toUpperCase() + user.lastName?.slice(1)
          }`}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phoneNumber}</Text>
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => setOpen(true)}>
        <Icon name="edit" size={22} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#ccc',
    borderWidth: 3,
    backgroundColor: '#b2bec3',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
    color: '#2d3436',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingBottom: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
  },
  value: {
    fontSize: 18,
    color: '#636e72',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0984e3',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 40,
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutBtn: {
    backgroundColor: '#d63031',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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

export default ProfilePage;
