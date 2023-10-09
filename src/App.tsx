import './App.scss';
import Routes from './routes';
import { useAppDispatch } from './app/hook.ts';
import { userApiActions, useUserSelector } from './stores/slices/user.slice.ts';
import { useAuth } from './context/hooks';
import { useEffect } from 'react';
import {useCookies} from "react-cookie";
import {api} from "./lib";

function App() {
  const { signedIn } = useAuth();
  const userStored = useUserSelector();
  const dispatch = useAppDispatch();
  const [cookie] = useCookies(['accessToken']);

  useEffect(() => {
    if (signedIn && Boolean(cookie.accessToken) && !userStored.isLoadingProfile) {
      api.defaults.headers.common.Authorization = `Bearer ${cookie.accessToken}`;
      dispatch(userApiActions.getUserProfileThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn, cookie.accessToken]);

  return <Routes />;
}

export default App;
