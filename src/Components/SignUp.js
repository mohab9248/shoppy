import {View, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import axios from 'axios';

export default function SignUp() {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phone, setPhone] = useState('');

  const USERS_ENDPOINT = 'http://10.0.2.2:4000/register';
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        USERS_ENDPOINT,
        {
          firstName: FirstName,
          lastName: LastName,
          email: Email,
          phoneNumber: Phone,
          password: Password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#30336b',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
        <Text style={{color: 'white', fontSize: 25}}>Welcome To Shoppy</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={styles.TextInput}
          mode="flat"
          label="First Name"
          value={FirstName}
          onChangeText={FirstName => setFirstName(FirstName.toString())}
        />
        <TextInput
          style={styles.TextInput}
          mode="flat"
          label="Last Name"
          value={LastName}
          onChangeText={LastName => setLastName(LastName.toString())}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={styles.TextInput}
          mode="flat"
          label="Email"
          value={Email}
          onChangeText={Email => setEmail(Email.toString())}
        />
        <TextInput
          style={styles.TextInput}
          mode="flat"
          label="Password"
          secureTextEntry
          value={Password}
          onChangeText={Password => setPassword(Password.toString())}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={styles.TextInput}
          mode="flat"
          label="Phone"
          value={Phone}
          onChangeText={Phone => setPhone(Phone.toString())}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          mode="contained"
          onPress={() => {
            handleSubmit();
          }}
          style={{margin: 10}}>
          SignUp
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  TextInput: {
    margin: 5,
    width: '40%',
    justifyContent: 'center',
  },
});
