import axios from 'axios';

import history from 'history.js';

const initialState = {
  id: null,
  email: '',
  nickname: '',
  token: localStorage.getItem('token') || ''
};

const SET_ACCOUNT_INFO = 'ACCOUNT/INFO/SET';
const PURGE_ACCOUNT = 'ACCOUNT/CLEAR';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload };
    case PURGE_ACCOUNT:
      return { ...initialState, token: '' };
    default:
      return state;
  }
};

export const getAccountInfo = () => dispatch => {
  axios
    .get('/account')
    .then(({ data }) => dispatch({ type: SET_ACCOUNT_INFO, payload: data }));
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
