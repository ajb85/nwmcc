import axios from 'axios';

import history from 'history.js';

const initialState = {
  id: null,
  email: '',
  nickname: '',
  token: localStorage.getItem('token') || '',
  fetchingAccount: false
};

const FETCHING = 'ACCOUNT/FETCHING';
const SET_ACCOUNT_INFO = 'ACCOUNT/SAVE';
const PURGE_ACCOUNT = 'ACCOUNT/CLEAR';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload, fetchingAccount: false };
    case PURGE_ACCOUNT:
      return { ...initialState, token: '' };
    case FETCHING:
      return { ...state, fetchingAccount: true };
    default:
      return state;
  }
};

export const getAccountInfo = () => (dispatch, getState) => {
  if (!getState().account.fetchingAccount) {
    dispatch({ type: FETCHING });
    axios.get('/account').then(res => {
      if (res) {
        dispatch({ type: SET_ACCOUNT_INFO, payload: res.data });
      }
    });
  }
};

export const loginAndRegister = account => dispatch => {
  const route = account.nickname ? 'register' : 'login';
  axios.post(`/account/${route}`, account).then(res => {
    if (res) {
      const { data } = res;
      localStorage.setItem('token', data.token);
      dispatch({ type: SET_ACCOUNT_INFO, payload: data });
      history.push('/');
    }
  });
};

export const purgeAccount = () => {
  localStorage.removeItem('token');
  return { type: PURGE_ACCOUNT };
};
