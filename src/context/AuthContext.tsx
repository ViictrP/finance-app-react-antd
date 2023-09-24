import { createContext, useContext } from 'react';
import { AccessToken, AuthContextData } from './data';
import axios from 'axios';
import { LoginDTO } from '../dto';
import { useCookies } from 'react-cookie';
import { login } from '../features';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const authenticate = async (user: LoginDTO): Promise<AccessToken> => {
    const { data } = await login(user);
    axios.defaults.headers.common['x-authentication-token'] = `${data.accessToken}`;
    setCookie('accessToken', data.accessToken);
    return { accessToken: data.accessToken };
  };

  const logout = () => {
    removeCookie('accessToken');
  };

  return (
    <AuthContext.Provider
      value={{ signedIn: Boolean(cookies.accessToken), authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
