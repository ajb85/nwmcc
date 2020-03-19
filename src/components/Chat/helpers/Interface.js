import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../styles.module.scss';

function Interface(props) {
  const [content, setContent] = useState('');
  const { activeChat } = useSelector(state => ({
    activeChat: state.chats.activeChat
  }));

  const sendMessage = e => {
    e.preventDefault();
    if (content.length) {
      axios
        .post(`/chats/${activeChat}/message`, { content })
        .then(_ => setContent(''));
    }
  };

  const handleMessageChange = e => {
    const limit = parseInt(process.env.REACT_APP_CHAR_LIMIT, 10);
    if (e.target.value.length <= limit) {
      setContent(e.target.value);
    }
  };
  return (
    <form className={styles.Interface} onSubmit={e => sendMessage(e)}>
      <input value={content} onChange={e => handleMessageChange(e)} />
      <div className={styles.buttonContainer}>
        <button type="submit">
          <FontAwesomeIcon icon={['fal', 'paper-plane']} />
        </button>
      </div>
    </form>
  );
}

export default Interface;
