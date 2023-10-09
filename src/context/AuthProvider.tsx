import {useCookies} from 'react-cookie';
import AuthContext from './AuthContext.tsx';
import {ReactNode} from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup, UserCredential,} from 'firebase/auth';
import {Catch, Finally, Then} from './data/auth-context.data.ts';
import {LoginError} from '../errors';
import {api} from "../lib";

interface AuthUser {
  accessToken: string;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const authenticate = (
    thenCb?: Then,
    catchCb?: Catch,
    finallyCb?: Finally
  ) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((token: UserCredential) => {
        const user = token.user as unknown as AuthUser;
        api.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
        setCookie('accessToken', user.accessToken);
        if (thenCb) {
          thenCb({
            name: token.user.displayName,
            email: token.user.email,
            photoUrl: token.user.photoURL,
          });
        }
      })
      .catch((error) => catchCb && catchCb(error as LoginError))
      .finally(() => finallyCb && finallyCb());
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
