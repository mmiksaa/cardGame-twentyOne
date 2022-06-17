import './scss/style.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container);

//<React.StrictMode>
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
