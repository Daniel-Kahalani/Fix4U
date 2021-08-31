import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  placeholder: {
    color: 'black',
  },
});

export default function Picker({ placeholder, items, onValueChange, value }) {
  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={items}
      onValueChange={onValueChange}
      style={pickerStyles}
      useNativeAndroidPickerStyle={false}
      value={value}
    />
  );
}
