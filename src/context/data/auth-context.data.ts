import { LoginDTO } from '../../dto';
import AccessToken from './access-token.ts';

export default interface AuthContextData {
  signedIn: boolean;
  logout: () => void;
  authenticate: (user: LoginDTO) => Promise<AccessToken>;
}
