import SInfo from 'react-native-sensitive-info';

const prefsName = 's-prefs';
const service = 's-keychain';

export interface SensitiveInfoData {
  key: string;
  service: string;
  value: string;
}

export const setItem = async (key: string, value: string) => {
  await SInfo.setItem(key, value, {
    sharedPreferencesName: prefsName,
    keychainService: service,
  });
};

export const getItem = async (key: string) => {
  const value = await SInfo.getItem(key, {
    sharedPreferencesName: prefsName,
    keychainService: service,
  });
  return value;
};

export const deteleItem = async (key: string) => {
  await SInfo.deleteItem(key, {
    sharedPreferencesName: prefsName,
    keychainService: service,
  });
};

export const getAllItem = () => {
  return SInfo.getAllItems({
    sharedPreferencesName: prefsName,
    keychainService: service,
  }).then((sensitiveInfo) => {
    if (Array.isArray(sensitiveInfo)) {
      let secureStorage: { [id: string]: string } = {};
      (sensitiveInfo as [Array<SensitiveInfoData>]).map((si) =>
        si.filter((data) => data.key && data.value).map((data) => (secureStorage[data.key] = data.value)),
      );
      return secureStorage;
    } else {
      return sensitiveInfo as { [id: string]: string };
    }
  });
};
