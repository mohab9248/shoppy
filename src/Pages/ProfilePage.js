import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {useUser} from '../context/UserContext';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Overlay from '../Components/Overlay';
import EditProfile from '../Components/EditProfile';
import Success from '../Components/Success';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';

export default function ProfilePage() {
  const {user, logout} = useUser();
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {user ? (
        <>
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
                user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
              } ${
                user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
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

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setOpen(true)}>
            <Icon name="edit" size={22} color="#fff" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.loginPrompt}>Please Login</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate(RouteNames.ACCOUNTPAGE)}
            style={styles.loginBtn}>
            Login
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    padding: 16,
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2d3436',
  },
  loginBtn: {
    width: '70%',
    borderRadius: 8,
    backgroundColor: '#0984e3',
  },
});
