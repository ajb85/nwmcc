const initialState = {
  account: {
    register: null,
    login: null
  }
};

const LOG_ERROR = 'ERRORS/LOG';
const CLEAR_ERRORS = 'ERRORS/CLEAR';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_ERROR: {
      return {
        ...state,
        [action.payload.section]: {
          ...state[action.payload.section],
          [action.payload.subsection]: action.payload.error
        }
      };
    }
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export const logError = error => ({ type: LOG_ERROR, payload: error });

export const clearErrors = () => ({ type: CLEAR_ERRORS });
