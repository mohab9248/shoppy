import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../constants/routeNames';

const PRODUCTS_ENDPOINT = 'http://10.0.2.2:4000/product';
const endpoint = 'http://10.0.2.2:4000/';
const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const Products_axios = async () => {
    try {
      const res = await axios({url: PRODUCTS_ENDPOINT, method: 'get'});
      setFilteredDataSource(res.data);
      setMasterDataSource(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(item => {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    Products_axios();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', flexDirection: 'row', margin: 3}}>
        <MaterialCommunityIcons name="magnify" color={'black'} size={30} />
        <TextInput
          autoCapitalize="none"
          placeholder="Search"
          clearButtonMode="always"
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc',
            height: 40,
            width: '90%',
          }}
        />
      </View>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{padding: 10}}
        data={filteredDataSource}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate(RouteNames.PRODUCTS_DETAILS, {
                  _id: item._id,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 3,
                  // borderWidth: 1,
                  // borderRadius: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  resizeMode="contain"
                  source={{uri: endpoint + item.image}}
                  style={{width: 50, height: 50, borderRadius: 25}}
                />
                <View style={{paddingLeft: 5}}>
                  <Text
                    style={{textTransform: 'lowercase'}}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.name.toUpperCase()}
                  </Text>
                  <Text style={{fontWeight: 'bold'}}>{item.price}$</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Search;

// import React, {Component, useState} from 'react';
// import {StyleSheet, Text, View, FlatList, TextInput, Image} from 'react-native';
// import axios from 'axios';
// import filter from 'lodash.filter';

// const Item = ({title, price, image}) => {
//   return (
//     <View style={{flexDirection: 'row'}}>
//       <Image
//         resizeMode="contain"
//         source={{uri: image}}
//         style={{width: 50, height: 50, borderRadius: 25}}
//       />
//       <View style={{paddingLeft: 5}}>
//         <Text style={{textTransform: 'lowercase'}} numberOfLines={1}>
//           {title}
//         </Text>
//         <Text style={{fontWeight: 'bold'}}>{price}$</Text>
//       </View>
//     </View>
//   );
// };
// const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';

// const renderItem = ({item}) => (
//   <Item title={item.title} price={item.price} image={item.image} />
// );
// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       searchValue: '',
//     };
//   }

//   componentDidMount() {
//     axios.get(PRODUCTS_ENDPOINT).then(res => {
//       this.setState({
//         data: res.data,
//       });
//       this.arrayholder = res.data;
//     });
//   }

//   searchFunction = text => {
//     const updatedData = this.arrayholder.filter(item => {
//       const item_data = `${item.title.toUpperCase()})`;
//       const text_data = text.toUpperCase();
//       return item_data.indexOf(text_data) > -1;
//     });
//     this.setState({data: updatedData, searchValue: text});
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           placeholder="Search Here..."
//           value={this.state.searchValue}
//           onChangeText={text => this.searchFunction(text)}
//           autoCorrect={false}
//           style={{
//             borderWidth: 1,
//             borderRadius: 5,
//             borderColor: '#ccc',
//             height: 40,
//             width: '100%',
//           }}
//         />
//         <FlatList
//           data={this.state.data}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//         />
//       </View>
//     );
//   }
// }

// export default Search;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//     padding: 2,
//   },
//   item: {
//     backgroundColor: '#f5f520',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
// });
