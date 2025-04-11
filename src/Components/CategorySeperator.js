import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategorySeperator = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.viewAll} onPress={onPress}>
        <Text style={styles.viewAllText}>View All</Text>
        <MaterialCommunityIcons name="arrow-right" color={'white'} size={18} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#130f40',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginRight: 4,
  },
});

export default CategorySeperator;
