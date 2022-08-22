import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = props => {
  const {
    style,
    row,
    middle,
    opacity,
    margin,
    space,
    padding,
    shadow,
    children,
    center,
    disabled,
    onPress,
  } = props;
  const handlePaddings = () => {
    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
  };

  const handleMargins = () => {
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
  };

  const buttonStyles = [
    styles.button,
    margin && {...handleMargins()},
    padding && {...handlePaddings()},
    style,
    row && styles.row,
    middle && styles.middle,
    center && styles.center,
    space && {justifyContent: `space-${space}`},
    disabled && {backgroundColor: $gray2},
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity !== 0.7 ? opacity : 0.85}
      onPress={() => {
        onPress && onPress();
      }}>
      {children}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  opacity: 0.7,
  onPress: () => {
    console.log('🚀 ~ file: CustomButton.js ~ line 140 ~');
  },
};

export default CustomButton;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  middle: {
    alignItems: 'center',
  },
});
