import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Account from 'components/Account/';
import Chat from 'components/Chat/';

import { getBackendPulse } from 'reducers/app.js';

function Routes(props) {
  const { token, isAwake } = useSelector(state => ({
    token: state.account.token,
    isAwake: state.app.isAwake
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAwake === null) {
      dispatch(getBackendPulse());
    }
  }, [isAwake, dispatch]);

  return (
    <>
      {isAwake ? (
        <>
          <Route exact path="/">
            {token ? <Chat /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Account isRegister={false} />
          </Route>
          <Route path="/register">
            <Account isRegistering={true} />
          </Route>
        </>
      ) : isAwake === false ? (
        <p>Waking up backend!</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Routes;
