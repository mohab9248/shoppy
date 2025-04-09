import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function SearchProduct({setSearchedQuery, searchedQuery}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for products"
        style={styles.input}
        value={searchedQuery}
        onChangeText={text => setSearchedQuery(text)}
      />
      <Icon name="search" size={20} color="#888" style={styles.icon} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 5,
    borderRadius: 20,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: '#d7d7d7',
    height: 50,
    marginTop: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
  },
});
