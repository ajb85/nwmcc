import axios from 'axios';
import store from 'store.js';
import { success, failure } from './responseHandler.js';
import { getAccountInfo } from 'reducers/account.js';
import { loading } from '../reducers/app.js';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

axios.interceptors.request.use(req => {
  store.dispatch(loading());
  const state = store.getState();
  const token = state.account.token;

  if (token) {
    req.headers.authorization = token;
  }

  if (
    !state.account.id &&
    !(req.url.split('/')[0] === 'account' && req.method === 'get')
  ) {
    // Get account info if not found in state
    store.dispatch(getAccountInfo());
  }

  return req;
});

axios.interceptors.response.use(success, failure);
