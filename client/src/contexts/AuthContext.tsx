import React, { createContext, useMemo, useReducer } from 'react';
import { AuthenticationResponseModel } from '_models';

interface LoginState {
  isLoading: boolean;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  token: string | null;
}

export interface AppAuthState {
  loginState: LoginState;
  retrieveToken: () => void;
  signIn: (userData: AuthenticationResponseModel) => void;
  signOut: () => void;
  signUp: (userData: AuthenticationResponseModel) => void;
  toggleLoading: (value: boolean) => void;
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
  }
};

let initialState = {
  isLoading: true,
  email: null,
  firstName: null,
  lastName: null,
  token: null,
} as LoginState;

let dispatcher = {
  retrieveToken: () => {},
  signIn: (_: AuthenticationResponseModel) => {},
  signOut: () => {},
  signUp: (_: AuthenticationResponseModel) => {},
  toggleLoading: (_: boolean) => {},
};

export const AuthContextProvider = ({ children }: any) => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  dispatcher = useMemo(
    () => ({
      retrieveToken: () => {
        dispatch({ type: 'RETRIEVE_TOKEN' });
      },
      signIn: (userData: AuthenticationResponseModel) => {
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
