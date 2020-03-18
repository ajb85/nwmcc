import { combineReducers } from 'redux';
import account from './account.js';
import app from './app.js';
import chat from './chat.js';
import errors from './errors.js';

export default combineReducers({
  account,
  app,
  chat,
  errors
});
