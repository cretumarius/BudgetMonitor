import * as Keychain from 'react-native-keychain';

export const storeCredentials = (email: string, password: string) => {
  Keychain.setGenericPassword(email, password, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
    storage: Keychain.STORAGE_TYPE.RSA,
  }).then(() => console.log('✅ Credentials stored.'));
};

export const getBiometryType = async () => {
  return await Keychain.getSupportedBiometryType();
};

export const authorize = async () => {
  const options = {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    authenticationPrompt: {
      title: 'Authentication needed',
      subtitle: 'Subtitle',
      description: 'Some descriptive text',
      cancel: 'Cancel',
    },
  };
  return await Keychain.getGenericPassword(options);
};

export const clearCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Credentials Reset!');
  } catch (err) {
    return 'Could not reset credentials, ' + err;
  }
};
