import {Alert, Linking} from 'react-native';
import React from 'react';
import style from './style';
import I18n from 'react-native-i18n';

const HomeScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const handleButton = async () => {
    Linking.openURL('appdemo://notificationScreen');
  };

  const changeLanguage = () => {
    I18n.locale = 'vn';
    setRefresh(pre => !pre);
  };
  return (
    <Block middle center flex>
      <CustomText>{i18n.t('NAME')}</CustomText>
      <CustomButton middle center style={style.button} onPress={handleButton}>
        <CustomText>Click me</CustomText>
      </CustomButton>
      <CustomButton middle center style={style.button} onPress={changeLanguage}>
        <CustomText>Change Language</CustomText>
      </CustomButton>
    </Block>
  );
};

export default HomeScreen;
