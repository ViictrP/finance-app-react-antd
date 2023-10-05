import './App.scss';
import Routes from './routes';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from './app/hook.ts';
import { userApiActions } from './stores/slices/user.slice.ts';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const dispatch = useAppDispatch();

  if (isAuthenticated && !isLoading) {
    dispatch(userApiActions.getUserProfileThunk());
  }

  return <Routes />;
}

export default App;
