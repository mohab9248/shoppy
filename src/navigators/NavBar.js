import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoryPage from '../Pages/CategoryPage';
import AccountPage from '../Pages/AccountPage';
import CartPage from '../Pages/CartPage';
import HomePage from '../Pages/HomePage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteNames from '../constants/routeNames';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProductsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteNames.PRODUCTS_HOME}
        component={HomePage}
      />
      <Stack.Screen
        options={({route}) => ({
          title: route?.params?.name || 'List',
        })}
        name={RouteNames.PRODUCTS_LIST}
        component={HomePage}
      />
      <Stack.Screen name={RouteNames.PRODUCTS_DETAILS} component={HomePage} />
    </Stack.Navigator>
  );
}
function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={RouteNames.HOME}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        component={ProductsNav}
      />
      <Tab.Screen
        name={RouteNames.CATEGORY}
        options={{
          headerShown: false,
          tabBarLabel: 'Categories',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="animation" color={color} size={26} />
          ),
        }}
        component={CategoryPage}
      />
      <Tab.Screen
        name={RouteNames.ACCOUNT}
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        component={AccountPage}
      />
      <Tab.Screen
        name={RouteNames.CART}
        options={{
          headerShown: false,
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
        component={CartPage}
      />
    </Tab.Navigator>
  );
}
export default NavBar;
