import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const CustomInput = props => {
  const {
    style,
    multiline,
    value,
    number,
    keyboardType,
    onChangeText,
    negative,
  } = props;
  return (
    <TextInput
      textAlignVertical={multiline ? 'top' : 'center'}
      multiline={multiline}
      value={value && value}
      onChangeText={e => {
        if (number) {
          const num = negative
            ? e.replace(/[^0-9-]/g, '')
            : e.replace(/[^0-9]/g, '');
          onChangeText(num);
        } else {
          onChangeText(e);
        }
      }}
      placeholderTextColor="#999"
      keyboardType={keyboardType || 'default'}
      style={[styles.input, style, multiline && {paddingTop: 10}]}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    margin: 0,
    padding: 0,
  },
});
