// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */

import React, {Component, useEffect} from 'react';
import {
  Alert,
  Platform,
  Button,
  Clipboard,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ReadMessageScreen = () => {
  const [state, setState] = useState({
    sendTo: '',
    sendBody: '',
    minDate: '',
    maxDate: '',
    smsList: [],
  });

  useEffect(() => {
    const check = async () => {
      if (Platform.OS === 'android') {
        try {
          if (!(await checkPermissions())) {
            await requestPermissions();
          }

          if (await checkPermissions()) {
            listSMS();
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    check();
  }, []);

  useEffect(() => {
    const fetch = () => {
      setTimeout(() => {
        listSMS();
      }, 5000);
    };
    fetch();

    return () => clearTimeout(() => fetch());
  });

  const checkPermissions = async () => {
    console.log('checking SMS permissions');
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (!hasPermissions) return false;
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      );
      if (!hasPermissions) return false;
    } catch (e) {
      console.error(e);
    }
    return hasPermissions;
  };

  const requestPermissions = async () => {
    let granted = {};
    try {
      console.log('requesting SMS permissions');
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
        ],
        {
          title: 'Example App SMS Features',
          message: 'Example SMS App needs access to demonstrate SMS features',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use SMS features');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const listSMS = () => {
    const {minDate, maxDate} = state;
    var filter = {
      box: 'inbox',
      maxCount: 30,
    };
    if (minDate !== '') {
      filter.minDate = minDate;
    }
    if (maxDate !== '') {
      filter.maxDate = maxDate;
    }

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        setState({smsList: arr});
      },
    );
  };

  console.log(state.smsList[0]);

  const renderShowSMS = () => {
    return state.smsList.map(sms => {
      return (
        <View style={{borderColor: '#bbb', borderWidth: 1}} key={sms._id}>
          <Text>From: {sms.address}</Text>
          <Text>Body: {sms.body}</Text>
          <Text>Id: {sms._id}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Date timestamp: {sms.date}</Text>
            <Button
              title="copy date"
              onPress={() => Clipboard.setString(sms.date.toString())}
            />
          </View>
          <Text>Date (readable): {new Date(sms.date).toString()}</Text>
        </View>
      );
    });
  };

  const renderLatestMessages = () => {
    return (
      <View style={{flex: 2, alignItems: 'flex-start'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.welcome}>Latest Messages</Text>
          <Button title="refresh list" onPress={listSMS} />
        </View>
        {/* {this.renderFilters()} */}
        <ScrollView>{renderShowSMS()}</ScrollView>
      </View>
    );
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  return <View style={styles.container}>{renderLatestMessages()}</View>;

  // render() {
  // The default 'react-native init' output is used if not android platform
  //   if (Platform.OS !== 'android') {
  //     return (
  //       <View style={styles.container}>
  //         <Text style={styles.welcome}>Welcome to React Native!</Text>
  //         <Text style={styles.instructions}>To get started, edit App.js</Text>
  //         <Text style={styles.instructions}>{instructions}</Text>
  //       </View>
  //     );
  //   }

  //   return <View style={styles.container}>{this.renderLatestMessages()}</View>;
  // }
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import SmsListener from 'react-native-android-sms-listener';

// const ReadMessageScreen = () => {
//   React.useEffect(() => {
//     SmsListener.addListener(message => {
//       console.info(message);
//     });
//   }, []);
//   return (
//     <View>
//       <Text>Read</Text>
//     </View>
//   );
// };

export default ReadMessageScreen;

// const styles = StyleSheet.create({});
