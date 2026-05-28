/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import Firebase from '@react-native-firebase/app';

import 'react-native-gesture-handler';

import firebaseConfig from './src/helpers/FirebaseConfig';

Firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
