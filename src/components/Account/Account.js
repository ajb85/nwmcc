import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginAndRegister } from 'reducers/account.js';
import { logError } from 'reducers/errors.js';

import history from 'history.js';

import styles from './styles.module.scss';

function Account({ isRegistering }) {
  const { errors } = useSelector(state => ({
    errors: state.errors.account
  }));

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: '',
    nickname: '',
    password: ''
  });

  const handleFormChange = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  // eslint-disable-next-line
  const isValidEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const canSubmit = isRegistering
    ? input.email.length && input.nickname.length && input.password.length
    : input.email.length && input.password.length;

  const handleSubmit = e => {
    e.preventDefault();
    let error;
    if (canSubmit) {
      if (isValidEmail.test(input.email)) {
        const account = { ...input };
        if (!isRegistering) {
          delete account.nickname;
        }
        dispatch(loginAndRegister(account));
      } else {
        error = {
          section: 'account',
          subsection: isRegistering ? 'register' : 'login',
          error: 'Please enter a valid email address'
        };
      }
    } else {
      error = {
        section: 'account',
        subsection: isRegistering ? 'register' : 'login',
        error: `Please complete the form before ${
          isRegistering ? 'registering.' : 'logging in.'
        }`
      };
    }
    if (error) {
      dispatch(logError(error));
    }
  };

  const errorMessage = errors[isRegistering ? 'register' : 'login'];
  return (
    <>
      <h1>React App Chatting!</h1>
      <form onSubmit={e => handleSubmit(e)} className={styles.Account}>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={input.email}
            name="email"
            autoComplete="email"
            onChange={e => handleFormChange(e)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={input.password}
            name="password"
            autoComplete="new-password"
            onChange={e => handleFormChange(e)}
          />
        </div>

        {isRegistering && (
          <div>
            <label>Nickname</label>
            <input
              type="text"
              value={input.nickname}
              name="nickname"
              onChange={e => handleFormChange(e)}
            />
          </div>
        )}
        <button
          disabled={!canSubmit}
          type="submit"
          style={{
            cursor: canSubmit ? 'pointer' : 'auto',
            opacity: canSubmit ? 1 : 0.5
          }}
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p
          className={styles.toggle}
          onClick={() => history.push(isRegistering ? '/login' : '/register')}
        >
          {isRegistering
            ? 'Login to existing account'
            : 'Register a new account'}
        </p>

        <p className={styles.error}>{errorMessage ? errorMessage : ''}</p>
      </form>
    </>
  );
}

export default Account;
