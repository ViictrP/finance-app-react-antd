import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import axios from 'axios';

const OAuth0LoginPage = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect().then();
  }

  useEffect(() => {
    getAccessTokenSilently().then((accessToken) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }, [getAccessTokenSilently]);

  return <></>;
};

export default OAuth0LoginPage;
