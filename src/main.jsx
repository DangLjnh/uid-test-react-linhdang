import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import store from './states/store';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StyleProvider>
  </React.StrictMode>
);