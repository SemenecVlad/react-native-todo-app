import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { FormInput } from "react-native-elements";

export default function MyTextInput(props) {
  const { input: { value, onChange }, ...inputProps } = props;

  return (
    <View>
      <FormInput
        {...inputProps}
        onChangeText={value => onChange(value)}
        value={value}
        inputStyle={{
          width: 200
        }}
      />
    </View>
  );
}
