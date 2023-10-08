import { LoginError } from '../../errors';
import { AuthUser } from '../../stores/slices/user.slice.ts';

export default interface AuthContextData {
  signedIn: boolean;
  logout: () => void;
  authenticate: (thenCb?: Then, catchCb?: Catch, finallyCb?: Finally) => void;
}

export type Then = (userAuth: AuthUser) => void;
export type Catch = (error: LoginError) => void;
export type Finally = () => void;
