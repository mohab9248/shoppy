import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';

function CategorySideBar(props) {
  const {changeSelectedCategory, selectedCategory, categories = []} = props;
  const changeCategory = s => () => changeSelectedCategory(s);
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
            onPress={changeCategory(s)}
            key={index}
            style={{
              flex: 1,
              textAlign: 'center',
              borderRightColor: '#30336b',
              borderWidth: 1,
              borderBottomWidth: 0,
              padding: 15,
              backgroundColor: s == selectedCategory ? '#30336b' : '#130f40',
            }}>
            <Text style={styles.Text} numberOfLines={2} adjustsFontSizeToFit>
              {s}
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
    fontSize: 16,
    textTransform: 'capitalize',
  },
});

export default CategorySideBar;
