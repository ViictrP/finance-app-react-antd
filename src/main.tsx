import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import {Provider} from 'react-redux';
import {store} from './stores/store.ts';
import {AuthProvider} from "./context";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
