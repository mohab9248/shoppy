import {Text, View, StyleSheet, Linking} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';

const AccountPage = () => {
  const [text, setText] = useState('');

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        margin: 50,
        // backgroundColor: 'black',
      }}>
      <TextInput
        style={styles.TextInput}
        mode="outlined"
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        style={styles.TextInput}
        mode="outlined"
        label="Password"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={{margin: 20}}>
        Login
      </Button>
      <View style={styles.lineStyle} />
      <Text style={{flex: 1, textAlign: 'center'}}>
        Don't have an account?
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL('http://google.com')}>
          SignUp
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    margin: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
  },
});
export default AccountPage;
