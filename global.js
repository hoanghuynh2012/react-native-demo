import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, ScrollView, FlatList, Dimensions} from 'react-native';
import {pxScale} from '~utils/funcHelper';
import {Colors} from '~assets';

import i18n from '~i18n';

const window = Dimensions.get('window');

import Block from '~components/Block';
import CustomButton from '~components/CustomButton';
import CustomInput from '~components/CustomInput';
import CustomText from '~components/CustomText';

const {width, height} = Dimensions.get('window');

global.WIDTH_NEED_CHANGE = 600;
global.MAX_WIDTH = width > 500 ? 500 : width;
global.IOS = Platform.OS === 'ios';
global.ANDROID = Platform.OS === 'android';
global.IPAD = width > WIDTH_NEED_CHANGE;

global.React = React;
global.i18n = i18n;
// RN Library
global.ScrollView = ScrollView;
global.Platform = Platform;
global.FlatList = FlatList;

// Hook
global.useState = useState;
global.useEffect = useEffect;
global.useRef = useRef;
global.useCallback = useCallback;

global.useNavigation = useNavigation;
global.useRoute = useRoute;

// // component
global.Block = Block;
global.CustomText = CustomText;
global.CustomInput = CustomInput;
global.CustomButton = CustomButton;

// device dimension
global.width = width;
global.height = height;

// responsive
// global.wp = pxScale.wp;
// global.hp = pxScale.hp;
// global.fontSize = pxScale.fontSize;

// theme
global.color = Colors;
