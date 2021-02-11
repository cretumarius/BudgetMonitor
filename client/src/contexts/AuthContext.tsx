import React, { createContext, useMemo, useReducer } from 'react';
import { AuthenticationResponseModel, CredentialsModel } from '_models';
import { Biometrics, SecureStorage } from '_core';

interface LoginState {
  isLoading: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  token: string | null;
  biometricsEnabled: boolean;
  biometricsActivationModalIsVisible: boolean;
}

export interface AppAuthState {
  loginState: LoginState;
  retrieveToken: () => void;
  signIn: (userData: AuthenticationResponseModel, credentials: CredentialsModel) => void;
  signOut: () => void;
  signUp: (userData: AuthenticationResponseModel) => void;
  toggleLoading: (value: boolean) => void;
  toggleBiometrics: (value: boolean) => void;
  toggleBiometricsActivationModalVisibleState: (value: boolean) => void;
}

const loginReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        token: action.token,
        isLoading: false,
        biometricsEnabled: action.biometricsEnabled == 'true',
      };
    case 'LOGIN':
      return {
        ...prevState,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        token: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        email: null,
        token: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        token: action.token,
        isLoading: false,
      };
    case 'LOADING_TOGGLE': {
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
    }
    case 'BIOMETRICS_TOGGLE': {
      return {
        ...prevState,
        biometricsEnabled: action.biometricsEnabled,
      };
    }
    case 'BIOMETRICS_ACTIVATION_MODAL_VISIBLE_STATE_TOGGLE': {
      return {
        ...prevState,
        biometricsActivationModalIsVisible: action.biometricsActivationModalIsVisible,
      };
    }
  }
};

let initialState = {
  isLoading: true,
  email: '',
  firstName: '',
  lastName: '',
  token: '',
  biometricsEnabled: false,
  biometricsActivationModalIsVisible: false,
} as LoginState;

let dispatcher = {
  retrieveToken: () => {},
  signIn: (_: AuthenticationResponseModel, __: CredentialsModel) => {},
  signOut: () => {},
  signUp: (_: AuthenticationResponseModel) => {},
  toggleLoading: (_: boolean) => {},
  toggleBiometrics: (_: boolean) => {},
  toggleBiometricsActivationModalVisibleState: (_: boolean) => {},
};

export const AuthContextProvider = ({ children }: any) => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  dispatcher = useMemo(
    () => ({
      retrieveToken: () => {
        SecureStorage.getAllItem().then((items) => {
          console.log('userData', items);
          dispatch({
            type: 'RETRIEVE_TOKEN',
            firstName: items.firstName || '',
            lastName: items.lastName || '',
            // token: items.token,
            biometricsEnabled: items.biometricsEnabled,
          });
        });
      },
      signIn: (userData: AuthenticationResponseModel, credentials: CredentialsModel) => {
        Object.entries(userData).forEach(([key, value]) => SecureStorage.setItem(key, value));
        Biometrics.storeCredentials(credentials.email, credentials.password);
        dispatch({
          type: 'LOGIN',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          token: userData.token,
        });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      },
      signUp: (userData: AuthenticationResponseModel) => {
        dispatch({
          type: 'REGISTER',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          token: userData.token,
        });
      },
      toggleLoading: (value: boolean) => {
        dispatch({
          type: 'LOADING_TOGGLE',
          isLoading: value,
        });
      },
      toggleBiometrics: (value: boolean) => {
        dispatch({
          type: 'BIOMETRICS_TOGGLE',
          biometricsEnabled: value,
        });
      },
      toggleBiometricsActivationModalVisibleState: (value: boolean) => {
        dispatch({
          type: 'BIOMETRICS_ACTIVATION_MODAL_VISIBLE_STATE_TOGGLE',
          biometricsActivationModalIsVisible: value,
        });
      },
    }),
    [],
  );

  const authContext = {
    loginState,
    ...dispatcher,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

const AuthContext = createContext<AppAuthState>({
  loginState: initialState,
  ...dispatcher,
});

export default AuthContext;
