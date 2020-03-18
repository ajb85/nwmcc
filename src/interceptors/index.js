import axios from 'axios';
import store from 'store.js';
import { success, failure } from './responseHandler.js';
import { loading } from '../reducers/app.js';

axios.defaults.baseURL = `${process.env.REACT_APP_BASEURL}`;

axios.interceptors.request.use(req => {
  store.dispatch(loading());
  const state = store.getState();
  const token = state.account.token;

  if (token) {
    req.headers.authorization = token;
  }

  return req;
});

axios.interceptors.response.use(success, failure);
