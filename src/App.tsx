import './App.scss';
import Routes from './routes';
import { useAppDispatch } from './app/hook.ts';
import { userApiActions, useUserSelector } from './stores/slices/user.slice.ts';
import { useAuth } from './context/hooks';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { api } from './lib';
import { Space, Spin, Typography } from 'antd';

function App() {
  const { signedIn } = useAuth();
  const userStored = useUserSelector();
  const dispatch = useAppDispatch();
  const [cookie] = useCookies(['accessToken']);

  useEffect(() => {
    if (
      signedIn &&
      Boolean(cookie.accessToken) &&
      !userStored.isLoadingProfile
    ) {
      api.defaults.headers.common.Authorization = `Bearer ${cookie.accessToken}`;
      dispatch(userApiActions.getUserProfileThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn, cookie.accessToken]);

  if (userStored.isLoadingProfile) {
    return (
      <Space
        direction="vertical"
        align="center"
        style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}
      >
        <Spin size="large" />
        <Typography.Paragraph>carregando</Typography.Paragraph>
      </Space>
    );
  }

  return <Routes />;
}

export default App;
