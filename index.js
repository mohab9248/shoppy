/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const ReduxApp = () => (
  <>
    <App />
  </>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
