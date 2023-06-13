import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, Image} from 'react-native';
import axios from 'axios';
import filter from 'lodash.filter';

const Item = ({title, price, image}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        resizeMode="contain"
        source={{uri: image}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <View style={{paddingLeft: 5}}>
        <Text style={{textTransform: 'lowercase'}} numberOfLines={1}>
          {title}
        </Text>
        <Text style={{fontWeight: 'bold'}}>{price}$</Text>
      </View>
    </View>
  );
};
const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';

const renderItem = ({item}) => (
  <Item title={item.title} price={item.price} image={item.image} />
);
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchValue: '',
    };
  }

  componentDidMount() {
    axios.get(PRODUCTS_ENDPOINT).then(res => {
      this.setState({
        data: res.data,
      });
      this.arrayholder = res.data;
    });
  }

  searchFunction = text => {
    const updatedData = this.arrayholder.filter(item => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({data: updatedData, searchValue: text});
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search Here..."
          value={this.state.searchValue}
          onChangeText={text => this.searchFunction(text)}
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc',
            height: 40,
            width: '100%',
          }}
        />
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: '#f5f520',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
// import {FlatList, Image, Pressable, Text, View, TextInput} from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import filter from 'lodash.filter';

// const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';
// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [products, setProducts] = useState([]);
//   const [fullData, setFullData] = useState([]);

//   const Products_axios = async () => {
//     try {
//       const res = await axios({url: PRODUCTS_ENDPOINT, method: 'get'});
//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   searchFunction = text => {
//     const updatedData = products.filter(item => {
//       const item_data = `${item.title.toUpperCase()})`;
//       const text_data = text.toUpperCase();
//       return item_data.indexOf(text_data) > -1;
//     });
//     setFullData(updatedData);
//     setSearchQuery(text);
//   };

//   // const handleSearch = query => {
//   //   setSearchQuery(query);
//   //   const results = fullData.filter(query);
//   //   return results;
//   //   //   const formattedQuery = query;
//   //   //   const filteredData = filter(fullData, title => {
//   //   //     return contains(title, formattedQuery);
//   //   //   });
//   //   //   setProducts(filteredData);
//   //   // };
//   //   // const contains = ({title}, query) => {
//   //   //   const user = title;
//   //   //   if (title.includes(query)) return true;
//   //   //   return false;
//   // };
//   useEffect(() => {
//     Products_axios();
//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       <View style={{alignItems: 'center', flexDirection: 'row', margin: 3}}>
//         <MaterialCommunityIcons name="magnify" color={'black'} size={30} />
//         <TextInput
//           autoCapitalize="none"
//           placeholder="Search"
//           clearButtonMode="always"
//           value={searchQuery}
//           onChangeText={text => searchFunction(text)}
//           style={{
//             borderWidth: 1,
//             borderRadius: 5,
//             borderColor: '#ccc',
//             height: 40,
//             width: '90%',
//           }}
//         />
//       </View>
//       <FlatList
//         style={{flex: 1}}
//         contentContainerStyle={{padding: 10}}
//         data={products}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => {
//           return (
//             <View style={{flexDirection: 'row'}}>
//               <Image
//                 resizeMode="contain"
//                 source={{uri: item.image}}
//                 style={{width: 50, height: 50, borderRadius: 25}}
//               />
//               <View style={{paddingLeft: 5}}>
//                 <Text style={{textTransform: 'lowercase'}} numberOfLines={1}>
//                   {item.title}
//                 </Text>
//                 <Text style={{fontWeight: 'bold'}}>{item.price}$</Text>
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default Search;
