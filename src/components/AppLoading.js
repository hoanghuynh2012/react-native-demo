import {StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
// import {useIsFocused} from '@react-navigation/native';
import json from '~assets/json';
import {useSelector} from 'react-redux';
import {pxScale} from '~utils/funcHelper';
import Block from './Block';

const AppLoading = () => {
  const {isShowLoading} = useSelector(state => state.handlerLoadingReducer);

  // const LottieRef = React.useRef(null);
  // const isFocused = useIsFocused();

  // React.useEffect(() => {
  //   if (isFocused && LottieRef.current) {
  //     setTimeout(() => {
  //       LottieRef.current?.reset();
  //       LottieRef.current?.play();
  //     }, 10);
  //   }
  // }, [isFocused, LottieRef.current]);

  if (!isShowLoading) {
    return <Block />;
  }
  return (
    <Block style={styles.container}>
      <LottieView
        source={json.loading}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.lottieView}
      />
    </Block>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    zIndex: 99999,
    height: '100%',
  },
  lottieView: {
    width: pxScale.wp(400),
  },
});
