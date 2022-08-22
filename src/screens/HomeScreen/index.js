import {Alert, Linking} from 'react-native';
import React from 'react';
import style from './style';

const HomeScreen = () => {
  const supportedURL = 'https://google.com';

  const handleButton = async () => {
    Linking.openURL('appdemo://notificationScreen');
  };
  return (
    <Block middle center flex>
      <CustomText>HomeScreen</CustomText>
      <CustomButton middle center style={style.button} onPress={handleButton}>
        <CustomText>Click me</CustomText>
      </CustomButton>
    </Block>
  );
};

export default HomeScreen;
