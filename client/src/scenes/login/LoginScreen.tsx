import React, { useContext, useEffect } from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { AuthContext } from '_contexts';
import { authorize, showError, showSuccess, storeCredentials } from '_core';

const LoginScreen = ({ _navigation }: any) => {
  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, setValue, errors, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      userName: '', // default value goes here, if you need one
    },
  });

  const canLoginWithBiometrics = async () => {
    return await authorize();
  };

  useEffect(() => {
    canLoginWithBiometrics().then((credentials) => {
      if (credentials) {
        showSuccess('Successful authentication');
        setTimeout(() => signIn(credentials.username, credentials.password), 1000);
      }
    });
  }, []);

  useEffect(() => {
    register('userName', { required: true }), register('password', { required: true });
  }, [register]);

  const onSubmit = async (data: { userName: string; password: string }) => {
    if (callLoginApi(data)) {
      setTimeout(() => signIn(data.userName, data.password), 1000);
      await storeCredentials(data.userName, data.password);
    }
  };

  const callLoginApi = (credentials) => {
    if (credentials.userName !== 'User' || credentials.password !== 'Pass') {
      showError('Invalid credentials');
      return false;
    } else {
      showSuccess('Successful authentication');
      return true;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageTitle}>
        <Text>Screen: Login</Text>
      </View>
      <View style={styles.form}>
        <Input
          label="Username"
          onChangeText={(value) => setValue('userName', value, { shouldValidate: true })}
          rightIcon={{ type: 'font-awesome', name: 'user' }}
          errorMessage={errors.userName?.type && 'Username is required'}
        />
        <Input
          label="Password"
          onChangeText={(value) => setValue('password', value, { shouldValidate: true })}
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          errorMessage={errors.password?.type && 'Password is required'}
          secureTextEntry
        />
        <Button
          color="black"
          title="Submit"
          onPress={handleSubmit((formData) => onSubmit(formData))}
          disabled={!formState.isValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    alignItems: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
});
