import {useAuth0} from '@auth0/auth0-react';
import {useEffect} from 'react';
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
    getAccessTokenSilently({
      cacheMode: 'off',
      authorizationParams: {audience: import.meta.env.VITE_AUTH0_AUDIENCE as string}
    }).then((accessToken) => {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    });
  }, [getAccessTokenSilently]);

  return <></>;
};

export default OAuth0LoginPage;
