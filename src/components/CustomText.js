import {StyleSheet, Text} from 'react-native';
import React from 'react';

const CustomText = props => {
  const {
    title,
    size,
    align,
    weight,
    center,
    right,
    height,
    color,
    secondary,
    primary,
    margin,
    padding,
    style,
    children,
  } = props;

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
  const textStyles = [
    styles.text,
    title && styles.title,
    size && {fontSize: size},
    margin && {...handleMargins()},
    padding && {...handlePaddings()},
    align && {textAlign: align},
    height && {lineHeight: height},
    weight && {
      fontWeight: weight === 'bold' && Platform.OS === 'ios' ? '500' : weight,
    },
    center && styles.center,
    right && styles.right,
    color && styles[color],
    color && !styles[color] && {color},
    // color shortcuts

    secondary && styles.secondary,
    primary && styles.primary,

    style, // rewrite predefined styles
  ];

  return <Text style={textStyles}>{children}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  // default style
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    // fontSize: pxScale.fontSize(16),
    // color: color.black,
  },
  // position
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
});
