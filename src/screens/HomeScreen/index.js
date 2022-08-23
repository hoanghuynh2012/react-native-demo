import {Alert, FlatList, Linking} from 'react-native';
import React from 'react';
import style from './style';
import Block from '~components/Block';
import CustomText from '~components/CustomText';
import CustomButton from '~components/CustomButton';
import Colors from '~assets/colors';
import {useNavigation} from '@react-navigation/native';
import Realm from 'realm';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = React.useState(false);

  let realmLanguages = new Realm({
    path: 'LanguageDatabase.realm',
    schema: [
      {
        name: 'language_local',
        properties: {
          id: {type: 'int', default: 0},
          title: 'string',
          value: 'string',
        },
      },
    ],
  });

  console.log(realmLanguages.objects('language_local'));

  React.useEffect(() => {
    let realm = new Realm({path: 'LanguageDatabase.realm'});
    if (realm.empty) {
      realm.write(() => {
        var ID =
          realm.objects('language_local').sorted('id', true).length > 0
            ? realm.objects('language_local').sorted('id', true)[0].user_id + 1
            : 1;
        realm.create('language_local', {
          id: ID,
          title: 'English',
          value: 'en',
        });
      });
    }
  }, []);

  const handleButton = async () => {
    Linking.openURL('appdemo://notificationScreen');
  };

  const changeLanguage = () => {
    I18n.locale = 'vn';
    setRefresh(pre => !pre);
  };

  const screen = [
    {
      title: 'NotificationScreen',
      value: 'NotificationScreen',
      color: '#FBDF07',
    },
    {title: 'RealmScreen', value: 'RealmScreen', color: '#42855B'},
  ];
  const _renderScreen = ({item}) => {
    return (
      <CustomButton
        middle
        center
        margin={10}
        style={{
          width: '45%',
          height: 150,
          backgroundColor: item.color,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate(item.value)}>
        <CustomText>{item.title}</CustomText>
      </CustomButton>
    );
  };
  return (
    <Block middle center flex style={{marginTop: 50}}>
      <CustomText>HOME</CustomText>
      <FlatList
        horizontal={false}
        numColumns={2}
        data={screen}
        keyExtractor={item => item.title}
        renderItem={_renderScreen}
      />
    </Block>
  );
};

export default HomeScreen;
