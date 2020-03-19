import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMessages } from 'reducers/chats.js';

import styles from '../styles.module.scss';

function Log(props) {
  const chatBottom = useRef(null);
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

  useEffect(() => {
    if (messages && messages.length) {
      chatBottom.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
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

    return messages.map((m, i) => {
      const ref = i === 0 ? chatBottom : null;
      return m.user_id !== user_id ? (
        <div ref={ref} key={m.id} className={styles.message}>
          <p>
            <span style={{ fontWeight: 800 }}>{m.author}</span>:{'  '}
            {m.content}
          </p>
        </div>
      ) : (
        <div ref={ref} key={m.id} className={styles.authorMessage}>
          <p>{m.content}</p>
        </div>
      );
    });
  };

  return <div className={styles.Log}>{displayMessages()}</div>;
}

export default Log;
