import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
//store
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store';
import { PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

