import React from 'react';
import {SvgCss} from 'react-native-svg';

const AppSvg = ({source, height, width}) => {
  return <SvgCss width={width} height={height} xml={source} />;
};

export default React.memo(AppSvg);
