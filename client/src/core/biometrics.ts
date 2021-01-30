import * as Keychain from 'react-native-keychain';

export const storeCredentials = async (username: string, password: string) => {
  await Keychain.setGenericPassword(username, password, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
    storage: Keychain.STORAGE_TYPE.RSA,
  });
};

export const getBiometryType = async () => {
  return await Keychain.getSupportedBiometryType();
};

export const authorize = async () => {
  try {
    const options = {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      authenticationPrompt: {
        title: 'Authentication needed',
        subtitle: 'Subtitle',
        description: 'Some descriptive text',
        cancel: 'Cancel',
      },
    };
    const credentials = await Keychain.getGenericPassword(options);
    if (credentials) {
      return credentials;
    } else {
      console.log('No credentials stored.');
      return false;
    }
  } catch (err) {
    console.log('Could not load credentials. ' + err);
    return false;
  }
};

export const clearCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Credentials Reset!');
  } catch (err) {
    return 'Could not reset credentials, ' + err;
  }
};
