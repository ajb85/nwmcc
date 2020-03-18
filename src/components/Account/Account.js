import React, { useState } from 'react';

import history from 'history.js';

function Account({ isRegistering }) {
  const [input, setInput] = useState({
    email: '',
    nickname: '',
    password: ''
  });

  const handleFormChange = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <form>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={input.email}
          name="email"
          onChange={e => handleFormChange(e)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="text"
          value={input.password}
          name="password"
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
      <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      <button
        type="button"
        onClick={() => history.push(isRegistering ? '/login' : '/register')}
      >
        {isRegistering ? 'Login to existing account' : 'Register a new account'}
      </button>
    </form>
  );
}

export default Account;
