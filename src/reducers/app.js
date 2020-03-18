import axios from 'axios';

const initialState = {
  isAwake: null,
  isLoading: false
};

const APP_LOADING = 'APP/LOADING';
const APP_DONE_LOADING = 'APP/LOADING/DONE';
const BACKEND_SLEEPING = 'APP/BACKEND/SLEEP';
const BACKEND_AWAKE = 'APP/BACKEND/AWAKE';

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, isLoading: true };
    case APP_DONE_LOADING:
      return { ...state, isLoading: false };
    case BACKEND_SLEEPING:
      return { ...state, isAwake: false };
    case BACKEND_AWAKE:
      return { ...state, isAwake: true };
    default:
      return state;
  }
};

export const loading = () => ({ type: APP_LOADING });
export const doneLoading = () => ({ type: APP_DONE_LOADING });

export const getBackendPulse = () => dispatch => {
  const interval = setTimeout(() => {
    dispatch({ type: BACKEND_SLEEPING });
    clearInterval(interval);
  }, 1000);

  axios.get('/').then(_ => {
    if (interval) {
      clearInterval(interval);
    }

    dispatch({ type: BACKEND_AWAKE });
  });
};
