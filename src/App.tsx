import './App.scss';
import Routes from './routes';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { selectUser, userApiActions } from './stores/slices/user.slice.ts';
import { useAppDispatch } from './app/hook.ts';
import { useAuth } from './context/AuthContext.tsx';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cookies] = useCookies(['accessToken']);
  const userStored = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { signedIn } = useAuth();

  useEffect(() => {
    if (signedIn && !userStored.isLoadingProfile && cookies.accessToken) {
      axios.defaults.headers.common['x-authentication-token'] = `${cookies.accessToken}`;
      dispatch(userApiActions.getUserProfileThunk());
    }
  }, [signedIn]);

  return <Routes />
}

export default App
