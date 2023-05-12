import {
  Text,
  View,
  StyleSheet,
  Linking,
  useWindowDimensions,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useState} from 'react';

const AccountPage = () => {
  const [text, setText] = useState('');

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
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL('http://google.com')}>
          SignUp
        </Text>
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
