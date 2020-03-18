import store from 'store.js';

import { doneLoading } from 'reducers/app.js';
import { purgeAccount } from 'reducers/account.js';
import { logError, clearErrors } from 'reducers/errors.js';

export function success(res) {
  store.dispatch(doneLoading());
  store.dispatch(clearErrors());
  return res;
}

export function failure(error) {
  store.dispatch(doneLoading());

  const res = error.response;
  if (res && res.data) {
    console.log('RECEIVED ERROR: ', res.data.message);
  }

  if (res && res.status === 401) {
    console.log('Bad authorization, purging account.');
    store.dispatch(purgeAccount());
  }

  if (res && res.data && res.data.route) {
    const sections = res.data.route.split('/');
    const payload = {
      section: sections[0],
      subsection: sections[1],
      error: res.data.message
    };
    store.dispatch(logError(payload));
  }
}
