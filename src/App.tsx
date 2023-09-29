import './App.scss';
import Routes from './routes';
import {useCookies} from 'react-cookie';
import {useSelector} from 'react-redux';
import {selectUser, userApiActions, useUserSelector} from './stores/slices/user.slice.ts';
import {useAppDispatch} from './app/hook.ts';
import axios from 'axios';
import {useAuth} from "./context/hooks";
import {useEffect} from "react";

function App() {
  const [cookies] = useCookies(['accessToken']);
  const userStored = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const {signedIn} = useAuth();
  const {profile: user} = useUserSelector();

  useEffect(() => {
    if (signedIn && !userStored.isLoadingProfile && cookies.accessToken && !user) {
      axios.defaults.headers.common['x-authentication-token'] = `${cookies.accessToken}`;
      dispatch(userApiActions.getUserProfileThunk());
    }
  }, [signedIn, dispatch, userStored.isLoadingProfile, cookies.accessToken, user]);

  return <Routes/>
}

export default App;
