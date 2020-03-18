import axios from 'axios';
import store from 'store.js';
import { success, failure } from './responseHandler.js';
import { loading } from '../reducers/app.js';
import { getAccountInfo } from '../reducers/account.js';

axios.defaults.baseURL = `${process.env.REACT_APP_BASEURL}`;

axios.interceptors.request.use(req => {
  store.dispatch(loading());
  const state = store.getState();
  const token = state.account.token;

  if (token) {
    req.headers.authorization = token;
  }

  //   if (!state.account.id && !(req.url === '/account' && req.method === 'get')) {
  //     // Get account info if not found in state
  //     store.dispatch(getAccountInfo());
  //   }
  return req;
});

axios.interceptors.response.use(success, failure);
