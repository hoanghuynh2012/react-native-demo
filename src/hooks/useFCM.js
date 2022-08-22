import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
  channelId: 'notification-channel-id',
  channelName: 'notification-channel',
  soundName: 'default',
});
// luôn luôn vào khi có notification bắn bào app
PushNotification.configure({
  onNotification(notification) {
    if (notification) {
      console.log(
        '🚀 ~ file: useFCM.js ~ line 15 ~ onNotification',
        notification,
      );
      //   Linking.openURL('emotion://notification');
    }
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
const useFCM = () => {
  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
    }
  };

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    return token;
  };

  useEffect(() => {
    //When the application in the foreground
    messaging().onMessage(remoteMessage => {
      PushNotification.localNotification({
        channelId: 'notification-channel-id',
        title: remoteMessage.notification.title,
        bigText: remoteMessage.notification.body, //content for Android
        message: remoteMessage.notification.body, //content for Ios
        ignoreInForeground: false,
        smallIcon: 'ic_launcher',
        largeIcon: 'ic_launcher',
        bigLargeIcon: 'ic_launcher',
        soundName: 'ting.mp3',
        ...remoteMessage,
      });
    });

    //When the application is running, but in the background.
    // bắt sự kiện khi đang mở app và đang chạy background luôn
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          '🚀 ~ file: useFCM.js ~ line 60 ~ onNotificationOpenedApp',
          remoteMessage,
        );
        Linking.openURL('appdemo://notificationScreen');
      }
    });

    //When the application is opened from a quit state.
    // băt sự kiện khi app đang đóng vào hiện thị notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            '🚀 ~ file: useFCM.js ~ line 74 ~ getInitialNotification',
            remoteMessage,
          );
          setTimeout(() => {
            Linking.openURL('appdemo://notificationScreen');
          }, 1000);
        }
      });
  }, []);

  return {requestUserPermission, getDeviceToken};
};

export default useFCM;
