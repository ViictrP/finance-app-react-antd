import { LoginDTO } from '../dto';
import { AccessToken } from '../context/data';
import { api } from '../lib';
import { LoginError } from '../errors';

const login = async (user: LoginDTO) => {
  return api.post<AccessToken>('/login', user)
    .catch(error => {
      console.error(error);
      throw new LoginError();
    });
};

export default login;
