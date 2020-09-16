import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

const store = configureStore(); // configureStore(overwriteInitialState), init state specified in reducers but passing here will overwrite

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);