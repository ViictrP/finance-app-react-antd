import { useCookies } from 'react-cookie';
import { LoginDTO } from '../dto';
import { AccessToken } from './data';
import { login } from '../features';
import axios from 'axios';
import AuthContext from './AuthContext.tsx';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const authenticate = async (user: LoginDTO): Promise<AccessToken> => {
    const { data } = await login(user);
    axios.defaults.headers.common[
      'x-authentication-token'
    ] = `${data.accessToken}`;
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

export default AuthProvider;
