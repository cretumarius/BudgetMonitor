import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { InputText } from '_organisms';
import { GenericButton } from '_molecules';
import { AccountService } from '../../services/api';
import { RegisterRequestModel } from '_models';
import { AuthContext } from '_contexts';
import { showError } from '_core';

const RegisterScreen = ({ navigation }: any) => {
  const accountService = new AccountService();
  const { signUp } = useContext(AuthContext);
  const { control, handleSubmit, getValues, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: RegisterRequestModel) => {
    const { ok, data } = await accountService.register(formData);
    const authenticationResponse = data;
    if (ok && authenticationResponse) {
      signUp(authenticationResponse);
    } else {
      showError(authenticationResponse.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
          <View>
            <InputText
              name="email"
              control={control}
              label="Adresă de email"
              placeholder="popescu.andrei@example.com"
              rules={{
                required: 'Adresa de email este obligatorie.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresa de email nu are un format valid.',
                },
              }}
              error={errors.email}
              icon={<Fontisto name="email" color="#05375a" size={20} />}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <InputText
              name="firstName"
              control={control}
              label="Nume"
              placeholder="Popescu"
              rules={{
                required: 'Numele este obligatoriu.',
              }}
              error={errors.firstName}
              icon={<FontAwesome name="user-o" color="#05375a" size={20} />}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <InputText
              name="lastName"
              control={control}
              label="Prenume"
              placeholder="Andrei"
              rules={{
                required: 'Prenumele este obligatoriu.',
              }}
              error={errors.lastName}
              icon={<FontAwesome name="user-o" color="#05375a" size={20} />}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <InputText
              name="password"
              control={control}
              label="Parolă"
              placeholder="Exemplu: Welkom01!"
              rules={{
                required: 'Parola este obligatoriu.',
              }}
              secureTextEntry
              error={errors.password}
              icon={<Feather name="lock" color="#05375a" size={20} />}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <InputText
              control={control}
              name={'confirmPassword'}
              label="Confirmă parola"
              placeholder="Welkom01!"
              rules={{
                required: 'Confirmarea parolei este obligatoriu.',
                validate: {
                  equalWithPassword: (value: string) => {
                    const { password } = getValues();
                    return password === value || 'Cele doua parole nu corespund';
                  },
                },
              }}
              secureTextEntry
              error={errors.confirmPassword}
              icon={<Feather name="lock" color="#05375a" size={20} />}
            />
          </View>
          {/*<View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}> Terms of service</Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}> Privacy policy</Text>
          </View>*/}
          <View style={styles.buttonsArea}>
            <GenericButton text="Crează cont" onPress={handleSubmit(onSubmit)} />
            <GenericButton text="Login" secondary onPress={() => navigation.goBack()} />
          </View>
        </KeyboardAwareScrollView>
      </Animatable.View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
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
  buttonsArea: {
    alignItems: 'center',
    marginTop: 50,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
