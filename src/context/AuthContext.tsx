import { createContext } from 'react';
import AuthContextData from './data/auth-context.data.ts';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
