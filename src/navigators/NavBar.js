import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoryPage from '../Pages/CategoryPage';
import AccountPage from '../Pages/AccountPage';
import CartPage from '../Pages/CartPage';
import HomePage from '../Pages/HomePage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RouteNames from '../constants/routeNames';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../Components/ProductDetails';
import {createContext, useState} from 'react';
import CheckoutForm from '../Components/CheckoutForm';
import Search from '../Components/Search';
export const CartContext = createContext([]);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProductsNav({setCart, ...others}) {
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
      <Stack.Screen name={RouteNames.PRODUCTS_DETAILS}>
        {props => <ProductDetails setCart={setCart} {...props} />}
      </Stack.Screen>

      <Stack.Screen name={RouteNames.SEARCH} options={{headerShown: false}}>
        {props => <Search {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
function NavBar() {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={cart}>
      <Tab.Navigator>
        <Tab.Screen
          name={RouteNames.HOME}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}>
          {props => <ProductsNav setCart={setCart} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name={RouteNames.CATEGORY}
          options={{
            headerShown: false,
            tabBarLabel: 'Categories',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="animation"
                color={color}
                size={26}
              />
            ),
          }}>
          {props => (
            <Stack.Navigator>
              <Stack.Screen
                name={RouteNames.CATEGORY}
                options={{headerShown: false}}
                component={CategoryPage}
              />
              <Stack.Screen name={RouteNames.CATEGORY_PRODUCTS_DETAILS}>
                {props => <ProductDetails setCart={setCart} {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name={RouteNames.CART}
          options={{
            headerShown: false,
            tabBarLabel: 'Cart',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="cart" color={color} size={26} />
            ),
          }}>
          {props => (
            <Stack.Navigator>
              <Stack.Screen
                name={RouteNames.CART}
                options={{headerShown: false}}>
                {props => <CartPage setCart={setCart} {...props} />}
              </Stack.Screen>
              <Stack.Screen name={RouteNames.CHECKOUT}>
                {props => <CheckoutForm {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
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
      </Tab.Navigator>
    </CartContext.Provider>
  );
}
export default NavBar;
