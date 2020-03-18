import axios from 'axios';

const initialState = {
  id: null,
  email: '',
  nickname: '',
  token: localStorage.getItem('token') || ''
};

const SET_ACCOUNT_INFO = 'ACCOUNT/INFO/SET';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, ...action.payload };
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
  axios.post(`/account/${route}`, account).then(({ data }) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: SET_ACCOUNT_INFO, payload: data });
  });
};
