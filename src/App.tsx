import './App.scss';
import Routes from './routes';
import { useAppDispatch } from './app/hook.ts';
import { userApiActions, useUserSelector } from './stores/slices/user.slice.ts';
import { useAuth } from './context/hooks';
import { useEffect } from 'react';

function App() {
  const { signedIn } = useAuth();
  const userStored = useUserSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (signedIn && !userStored.isLoadingProfile) {
      dispatch(userApiActions.getUserProfileThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn]);

  return <Routes />;
}

export default App;
