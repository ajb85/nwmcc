import React, { useState, useEffect, useContext, createContext } from 'react';

const context = createContext();

export function createStore(reducer) {
  let state = reducer(undefined, {});
  let listeners = [];

  return {
    // From the created store, retrieve current state at any time
    getState: () => state,

    // Update the store from anywhere JavaScript exists
    dispatch: action => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    },

    // Run a callback any time state is updated.
    // Returns an unsubscribe function
    subscribe: listener => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    }
  };
}

export function combineReducers(reducers) {
  // Only one reducer can be used so to allow for multiples,
  // this function returns a new function that loops over all reducers
  // and provides the action to each.
  return function(state, action) {
    const newState = {};
    for (let r in reducers) {
      newState[r] = reducers[r](state ? state[r] : undefined, action);
    }

    return newState;
  };
}

export function Provider(props) {
  // Converts redux store into React state and shares app-wide
  // via context
  const [state, setState] = useState(props.store.getState());

  useEffect(() => {
    const unsubscribe = props.store.subscribe(() =>
      setState(props.store.getState())
    );
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ContextProvider = context.Provider;
  return (
    <ContextProvider value={{ state, store: props.store }}>
      {props.children}
    </ContextProvider>
  );
}

export function useSelector(selecting) {
  // Redux hook that takes in a function that returns
  // a piece of state
  const { state } = useContext(context);
  return selecting(state);
}

export function useDispatch() {
  // Redux hook to retrieve the dispatch function.
  const { store } = useContext(context);
  return store.dispatch;
}
