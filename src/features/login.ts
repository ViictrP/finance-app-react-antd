import { LoginDTO } from '../dto';
import AccessToken from '../context/data/access-token.ts';
import { api } from '../lib/api.ts';
import { LoginError } from '../errors/login.error.ts';

const login = async (user: LoginDTO) => {
  return api.post<AccessToken>('/login', user).catch((error) => {
    console.error(error);
    throw new LoginError();
  });
};

export default login;
