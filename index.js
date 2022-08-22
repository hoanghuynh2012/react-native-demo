/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import './global.js';
import {name as appName} from './app.json';
import {TextInput, Text} from 'react-native';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: true,
  maxFontSizeMultiplier: 1,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: true,
  maxFontSizeMultiplier: 1,
};

AppRegistry.registerComponent(appName, () => App);
