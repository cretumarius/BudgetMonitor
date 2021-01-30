import React, { createContext, useMemo, useReducer } from 'react';

interface LoginState {
  isLoading: boolean;
  userName: string | null;
  userToken: string | null;
}

export interface AppAuthState {
  loginState: LoginState;
  retrieve_token: () => void;
  signIn: (_: string, __: string) => void;
  signOut: () => void;
  signUp: () => void;
}

const loginReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.userToken,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.userName,
        userToken: action.userToken,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userName: action.userName,
        userToken: action.userToken,
        isLoading: false,
      };
  }
};

let initialState = {
  isLoading: true,
  userName: null,
  userToken: null,
} as LoginState;

let dispatcher = {
  retrieve_token: () => {},
  signIn: (_: string, __: string) => {},
  signOut: () => {},
  signUp: () => {},
};

export const AuthContextProvider = ({ children }: any) => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  dispatcher = useMemo(
    () => ({
      retrieve_token: () => {
        dispatch({ type: 'RETRIEVE_TOKEN' });
      },
      signIn: (userName: string, password: string) => {
        let token = null;
        if (userName === 'User' && password === 'Pass') {
          token = 'token';
        }
        dispatch({
          type: 'LOGIN',
          userName: userName,
          userToken: token,
        });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {},
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
