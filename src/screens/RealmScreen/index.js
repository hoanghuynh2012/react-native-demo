import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Block from '~components/Block';
import Realm from 'realm';
import CustomInput from '~components/CustomInput';
import CustomButton from '~components/CustomButton';
import CustomText from '~components/CustomText';
import {pxScale} from '~utils/funcHelper';
import Colors from '~assets/colors';
import AppFastImage from '~components/AppFastImage';
import images from '~assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  handleHideLoading,
  handleShowLoading,
} from '~redux/actions/HandlerLoading';
import json from '~assets/json';
import LottieView from 'lottie-react-native';
import AppSvg from '~components/AppSvg';
import {AppIcon} from '~assets/svg';
import {useNavigation} from '@react-navigation/native';

const RealmScreen = () => {
  const navigation = useNavigation();

  const [state, setState] = useState({
    name: '',
    contact: '',
    address: '',
  });

  const dispatch = useDispatch();

  let realmListUser = new Realm({path: 'UserDatabase.realm'});

  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    var listUser = realmListUser.objects('listUser');
    setDataUser(listUser);
  }, []);

  let realm = new Realm({
    path: 'UserDatabase.realm',
    schema: [
      {
        name: 'listUser',
        properties: {
          id: {type: 'int', default: 0},
          name: 'string',
          contact: 'string',
          address: 'string',
        },
      },
    ],
  });

  const registerUser = () => {
    dispatch(handleShowLoading());

    let realm = new Realm({path: 'UserDatabase.realm'});

    if (state.name) {
      if (state.contact) {
        if (state.address) {
          realm.write(() => {
            var ID =
              realm.objects('listUser').sorted('id', true).length > 0
                ? realm.objects('listUser').sorted('id', true)[0].id + 1
                : 1;
            realm.create('listUser', {
              id: ID,
              name: state.name,
              contact: state.contact,
              address: state.address,
            });
            var listUser = realmListUser.objects('listUser');
            setDataUser(listUser);
            dispatch(handleHideLoading());
            Alert.alert(i18n.t('SUCCESS'), i18n.t('REGISTERED_SUCCESS'), {
              cancelable: false,
            });
          });
        } else {
          dispatch(handleHideLoading());
          alert(i18n.t('PLEASE_ADDRESS'));
        }
      } else {
        dispatch(handleHideLoading());
        alert(i18n.t('PLEASE_CONTACT'));
      }
    } else {
      dispatch(handleHideLoading());
      alert(i18n.t('PLEASE_NAME'));
    }
  };

  const searchUser = id => {
    var user = realm.objects('listUser').filtered('id =' + id);
    if (user.length > 0) {
      setState({
        ...state,
        name: user[0].name,
        contact: user[0].contact,
        address: user[0].address,
      });
    } else {
      alert('No user found');
    }
  };

  const deleteUser = id => {
    Alert.alert(i18n.t('TITLE_DELETE_USER'), i18n.t('SUB_TITLE_DELETE_USER'), [
      {
        text: 'Ok',
        onPress: () => {
          realm.write(() => {
            if (realm.objects('listUser').filtered('id =' + id).length > 0) {
              realm.delete(realm.objects('listUser').filtered('id =' + id));
              setDataUser(realm.objects('listUser'));
            }
          });
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };
  const _renderItem = ({item}) => {
    return (
      <Block
        padding={10}
        style={{
          backgroundColor: Colors.White,
          borderRadius: 6,
          marginBottom: 10,
        }}>
        <Block row>
          <Block flex>
            <Block row middle>
              <CustomText
                color={Colors.Gray}
                size={14}
                style={{width: pxScale.wp(60)}}>
                {i18n.t('NAME')}:
              </CustomText>
              <CustomText margin={(5, 5)} color={Colors.Black} size={16}>
                {item.name}
              </CustomText>
            </Block>
            <Block row middle>
              <CustomText
                color={Colors.Gray}
                size={14}
                style={{width: pxScale.wp(60)}}>
                {i18n.t('CONTACT')}:
              </CustomText>
              <CustomText margin={(5, 5)} color={Colors.Black} size={16}>
                {item.contact}
              </CustomText>
            </Block>
            <Block row middle>
              <CustomText
                numberOfLines={1}
                color={Colors.Gray}
                size={14}
                style={{width: pxScale.wp(60)}}>
                {i18n.t('ADDRESS')}:
              </CustomText>
              <CustomText margin={(5, 5)} color={Colors.Black} size={16}>
                {item.address}
              </CustomText>
            </Block>
          </Block>
          <Block flex style={{alignItems: 'flex-end'}} center>
            <AppFastImage
              source={images.imageBlank}
              style={{
                width: pxScale.wp(130),
                height: pxScale.wp(80),
                borderRadius: 6,
              }}
            />
          </Block>
        </Block>
        <Block row flex space={'between'} style={{marginTop: 10}}>
          <CustomButton
            flex
            middle
            center
            style={{
              backgroundColor: Colors.Yellow,
              height: pxScale.hp(30),
              borderRadius: 6,
              width: '30%',
            }}
            onPress={() => searchUser(item.id)}>
            <CustomText color={Colors.White} weight={'500'}>
              {i18n.t('UPDATE')}
            </CustomText>
          </CustomButton>
          <CustomButton
            middle
            center
            flex
            style={{
              backgroundColor: 'red',
              height: pxScale.hp(30),
              borderRadius: 6,

              width: '30%',
            }}
            onPress={() => {
              deleteUser(item.id);
            }}>
            <CustomText color={Colors.White} weight={'500'}>
              {i18n.t('DELETE')}
            </CustomText>
          </CustomButton>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex style={{backgroundColor: Colors.Gray}}>
      <SafeAreaView>
        <Block
          padding={10}
          style={{
            backgroundColor: Colors.White,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}>
          <Block row middle space="between">
            <CustomButton onPress={() => navigation.goBack()}>
              <AppSvg source={AppIcon.iconGoBack} width={14} height={14} />
            </CustomButton>
            <CustomText color={Colors.Black} size={20} weight={'700'} align>
              Realm Screen
            </CustomText>
            <Block />
          </Block>
          <CustomText color={Colors.Black} size={16} weight={'500'}>
            {i18n.t('NAME')}
          </CustomText>
          <CustomInput
            style={styles.input}
            value={state.name}
            onChangeText={e => setState({...state, name: e})}
          />
          <CustomText color={Colors.Black} size={16} weight={'500'}>
            {i18n.t('CONTACT')}
          </CustomText>
          <CustomInput
            keyboardType={'number-pad'}
            style={styles.input}
            value={state.contact}
            onChangeText={e => setState({...state, contact: e})}
          />
          <CustomText color={Colors.Black} size={16} weight={'500'}>
            {i18n.t('ADDRESS')}
          </CustomText>
          <CustomInput
            style={styles.input}
            value={state.address}
            onChangeText={e => setState({...state, address: e})}
          />
          <Block middle center>
            <CustomButton
              style={styles.buttonSubmit}
              onPress={() => registerUser()}>
              <CustomText color={Colors.White} size={16} weight={'600'}>
                {i18n.t('SUBMIT')}
              </CustomText>
            </CustomButton>
          </Block>
        </Block>
      </SafeAreaView>
      <Block flex style={{backgroundColor: Colors.Gray}} padding={10}>
        <FlatList
          data={dataUser}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <Block middle center flex>
              <LottieView
                source={json.empty}
                autoPlay
                loop
                resizeMode="cover"
                style={{width: pxScale.wp(300), height: pxScale.hp(300)}}
              />
            </Block>
          )}
        />
      </Block>
    </Block>
  );
};

export default RealmScreen;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 6,
    height: pxScale.hp(40),
    marginTop: pxScale.hp(6),
    marginBottom: pxScale.hp(10),
    borderColor: Colors.Gray,
    borderWidth: 1,
    backgroundColor: Colors.White,
  },
  buttonSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Success,
    width: pxScale.wp(110),
    height: pxScale.hp(40),
    borderRadius: 10,
  },
});
