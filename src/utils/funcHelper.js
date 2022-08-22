import React from 'react';
import {Dimensions} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const pxScale = {
  // * width / height IPHONE X
  guidelineBaseWidth: 375,
  guidelineBaseHeight: 812,

  widthScale() {
    return SCREEN_WIDTH / this.guidelineBaseWidth;
  },

  heightScale() {
    return SCREEN_HEIGHT / this.guidelineBaseHeight;
  },

  wp(px) {
    const percentage = (px / this.guidelineBaseWidth) * 100;
    return wp(percentage);
  },

  hp(px) {
    const scale = isIphoneX() ? this.heightScale() : 1;
    const percentage = (px / scale / this.guidelineBaseHeight) * 100;
    return hp(percentage);
  },

  fontSize(px, baseHeight = isIphoneX() ? 812 : this.guidelineBaseHeight) {
    return RFValue(px, baseHeight);
  },
};
