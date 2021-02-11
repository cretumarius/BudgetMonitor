import React, { ReactElement, useState, Fragment } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { FieldError, Controller, Control } from 'react-hook-form';
import { ErrorMessage } from '_atoms';
import { Colors } from '_styles';

export const InputText = (props: {
  label: string;
  placeholder: string;
  name: string;
  control: Control;
  rules: any;
  secureTextEntry?: boolean;
  error: FieldError | undefined;
  icon: ReactElement;
}) => {
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <Text style={styles.text_footer}>{props.label}</Text>
      <View style={styles.action}>
        {props.icon}
        <Controller
          name={props.name}
          control={props.control}
          rules={props.rules}
          render={(properties) => (
            <TextInput
              {...properties}
              placeholder={props.placeholder}
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={props.secureTextEntry && !showPassword}
              onChangeText={(value) => properties.onChange(value)}
              onEndEditing={() => setShouldValidate(true)}
            />
          )}
        />
        {props.secureTextEntry ? (
          <TouchableOpacity onPress={() => setShowPassword((prevState) => !prevState)}>
            {showPassword ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color={Colors.GREEN} size={20} />
            )}
          </TouchableOpacity>
        ) : shouldValidate && !props.error ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : (
          <Fragment />
        )}
      </View>
      {props.error && <ErrorMessage message={props.error.message} />}
    </>
  );
};

const styles = StyleSheet.create({
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
