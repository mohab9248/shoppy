import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

function CategorySideBar(props) {
  const {changeSelectedCategory, selectedCategory, categories = []} = props;

  return (
    <ScrollView
      style={{
        flex: 1,
        textAlign: 'center',
        marginRight: 0,
        width: 150,
      }}
      showsVerticalScrollIndicator={false}>
      {categories.map((s, index) => {
        return (
          <Pressable
            onPress={() => changeSelectedCategory(s.id)}
            key={index}
            style={{
              flex: 1,
              textAlign: 'center',
              borderRightColor: '#353b48',
              borderWidth: 1,
              padding: 15,
              backgroundColor: s.id == selectedCategory ? '#353b48' : 'black',
            }}>
            <Text style={styles.Text} numberOfLines={1} adjustsFontSizeToFit>
              {s.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 18,
  },
});

export default CategorySideBar;
