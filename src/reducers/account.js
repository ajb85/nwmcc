import axios from 'axios';

const initialState = {
  id: null,
  email: '',
  nickname: '',
  token: ''
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
