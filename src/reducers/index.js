import { combineReducers } from 'redux';
import account from './account.js';
import app from './app.js';
import chats from './chats.js';
import errors from './errors.js';

export default combineReducers({
  account,
  app,
  chats,
  errors
});
