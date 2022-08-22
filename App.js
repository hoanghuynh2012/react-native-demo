import React from 'react';
import AppNavigator from '~navigators/AppNavigator';
import {useFCM} from '~hooks';

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
  return <AppNavigator />;
};

export default App;
