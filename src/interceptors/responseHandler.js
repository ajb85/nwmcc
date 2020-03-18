import store from 'store.js';

import { doneLoading } from 'reducers/app.js';

export function success(res) {
  store.dispatch(doneLoading());
  return res;
}

export function failure(error) {
  store.dispatch(doneLoading());
}
