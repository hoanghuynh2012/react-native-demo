import React, {useState} from 'react';
import Image from '~assets/images';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Colors from '~assets/colors';

const ImageProgress = createImageProgress(FastImage);

const AppFastImage = props => {
  const [errorUrl, setErrorUrl] = useState(false);

  const onError = () => {
    setErrorUrl(true);
  };

  return (
    <ImageProgress
      indicator={() => {
        if (props.haveLoading) {
          return (
            <FastImage
              style={styles.linearGradientStyle}
              source={Image.imageBlank}
            />
          );
        }
        return null;
      }}
      {...props}
      source={errorUrl ? Image.imageBlank : props.source}
      onError={onError}
      style={[styles.imgStyle, props.style]}
    />
  );
};
AppFastImage.propTypes = {
  haveLoading: PropTypes.bool,
};
AppFastImage.defaultProps = {
  haveLoading: true,
};

export default React.memo(AppFastImage);

const styles = StyleSheet.create({
  linearGradientStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textLoading: {
    color: Colors.White,
  },
  imgStyle: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
});
