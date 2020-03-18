import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store.js';

// Routing
import { Router } from 'react-router-dom';
import history from './history.js';

// Axios interceptors
import './interceptors/';

// Styles
import 'SCSS/index.scss';
import 'faLibrary.js';

import Routes from './components/Routes/';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
