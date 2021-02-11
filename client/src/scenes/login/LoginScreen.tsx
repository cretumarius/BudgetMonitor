import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '_contexts';
import { Banner, Biometrics, SecureStorage } from '_core';
import { AccountService } from '_apiServices';
import { CredentialsModel } from '_models';
import { Colors, Common, Typography } from '_styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { BiometricsImg } from '_resources';
import * as Keychain from 'react-native-keychain';

const LoginScreen = ({ navigation }: any) => {
  const [data, setData] = React.useState({
    username: 'cretu.marius@centric.eu',
    password: 'Parola123',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [showBiometrics, setShowBiometrics] = useState<boolean>(false);

  useEffect(() => handleBiometricsAuthentication(), []);

  const handleBiometricsAuthentication = () => {
    Promise.all([Biometrics.getBiometryType(), SecureStorage.getItem('biometricsEnabled')]).then((result) => {
      console.log('biometryType', result[0]);
      console.log('biometricsEnabled', result[1] == 'true');

      const biometryType = result[0];
      const isBiometricAuthenticationEnabled = result[1] == 'true';
      setShowBiometrics(biometryType && isBiometricAuthenticationEnabled);
      if (biometryType && isBiometricAuthenticationEnabled) {
        Biometrics.authorize().then((res: false | Keychain.UserCredentials) => {
          if (res) {
            loginHandle(res.username, res.password);
          } else {
            Banner.showError('Ceva nu a mers bine');
          }
        });
      }
    });
  };

  const accountService = new AccountService();

  const { signIn } = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (email: string, password: string) => {
    if (data.username.length === 0 || data.password.length === 0) {
      Banner.showError('Username or password field cannot be empty.');
      return;
    }
    accountService
      .authenticate({ email: email, password: password })
      .then((response) => {
        const authenticationResponse = response.data;
        if (authenticationResponse) {
          if (response.ok) {
            signIn(authenticationResponse, { email: email, password: password } as CredentialsModel);
          } else {
            Banner.showError(authenticationResponse.message);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      {showBiometrics ? (
        <View style={styles.header}>
          <View style={[Common.card, { borderRadius: 100 }]}>
            <Animatable.Image
              animation="bounceIn"
              duration={1500}
              source={BiometricsImg}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <View style={styles.heade2}>
          <Text style={styles.text_header}>Autentificare</Text>
        </View>
      )}
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: Colors.WHITE,
          },
        ]}
      >
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Fontisto name="email" color={Colors.GREEN} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: Colors.BLACK,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color={Colors.GREEN} size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Parola
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={Colors.GREEN} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: Colors.BLACK,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color={Colors.GREEN} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Parola trebuie sa aibă minim 8 caractere</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: '#009387', marginTop: 15 }}>Ai uitat parola?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          >
            <LinearGradient colors={[Colors.GREEN, '#01ab9d']} style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}
              >
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[
              styles.signIn,
              {
                borderColor: Colors.GREEN,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: Colors.GREEN,
                },
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heade2: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: Colors.BLUE,
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
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
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
});
/*
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
*/
