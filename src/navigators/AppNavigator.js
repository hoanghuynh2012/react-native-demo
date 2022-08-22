import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NotificationScreen, HomeScreen} from '~screens';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['appdemo://'],
  config: {
    initialRouteName: 'HomeScreen',
    screens: {
      HomeScreen: {
        path: 'homeScreen',
      },
      NotificationScreen: {
        path: 'notificationScreen',
      },
    },
  },
};

function AppNavigator() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
