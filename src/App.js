import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBackendPulse } from 'reducers/app.js';

function App() {
  const dispatch = useDispatch();
  const { isAwake } = useSelector(state => ({ isAwake: state.app.isAwake }));

  useEffect(() => {
    if (isAwake === null) {
      dispatch(getBackendPulse());
    }
  }, [isAwake, dispatch]);

  const getText = () => {
    switch (isAwake) {
      case null:
        return 'Loading app!';
      case false:
        return 'Oops, the backend is sleeping!';
      default:
        return 'Welcome';
    }
  };
  return <div className="App">{getText()}</div>;
}

export default App;
