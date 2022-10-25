import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NotificationScreen,
  HomeScreen,
  RealmScreen,
  PlaySoundScreen,
} from '~screens';
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
        initialRouteName="PlaySoundScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="RealmScreen" component={RealmScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="PlaySoundScreen" component={PlaySoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
