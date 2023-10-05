import { createContext } from 'react';
import { AuthContextData } from './data';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
