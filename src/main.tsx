import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev--sdch3u7.us.auth0.com"
      clientId="IaIabf9KbZo794MG1qsqFtj3DRVzEQSZ"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://api.financeapp.dev',
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
