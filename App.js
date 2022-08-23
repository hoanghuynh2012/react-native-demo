import React from 'react';
import AppNavigator from '~navigators/AppNavigator';
import {useFCM} from '~hooks';
import {Provider} from 'react-redux';
import store from '~redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppLoading} from '~components';
import Realm from 'realm';

const AppNavigation = () => {
  return <AppNavigator />;
};

const App = () => {
  const fcm = useFCM();
  React.useEffect(() => {
    fcm.requestUserPermission();
    fcm
      .getDeviceToken()
      .then(DeviceToken => {
        console.log(
          '🚀 ~ file: App.js ~ line 13 ~ getDeviceToken',
          DeviceToken,
        );
      })
      .catch(e =>
        console.log('🚀 ~ file: App.js ~ line 18 ~ error getDeviceToken', e),
      );
  }, [fcm]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
        <AppLoading />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
