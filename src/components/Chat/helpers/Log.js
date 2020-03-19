import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMessages } from 'reducers/chats.js';

import styles from '../styles.module.scss';

function Log(props) {
  const { messages, user_id } = useSelector(state => ({
    messages: state.chats.messages[state.chats.activeChat],
    user_id: state.account.id
  }));
  const [fetched, setFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!messages && !fetched) {
      dispatch(fetchMessages(1));
      setFetched(true);
    }
  }, [messages, dispatch, fetched]);
  const displayMessages = () => {
    if (!messages) {
      return <p className={styles.info}>Fetching your messages...</p>;
    }

    if (!messages.length) {
      return (
        <p className={styles.info}>
          Break the ice, be the first to send a message!
        </p>
      );
    }

    return messages.map(m => {
      return m.user_id !== user_id ? (
        <div key={m.id} className={styles.message}>
          <p>
            {m.author}: {m.content}
          </p>
        </div>
      ) : (
        <div key={m.id} className={styles.authorMessage}>
          <p>{m.content}</p>
        </div>
      );
    });
  };

  return <div className={styles.Log}>{displayMessages()}</div>;
}

export default Log;
