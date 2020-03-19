import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Log from './helpers/Log.js';
import UserList from './helpers/UserList.js';
import Interface from './helpers/Interface.js';

import sockets from 'sockets/';
import { populateChats } from 'reducers/chats.js';

import styles from './styles.module.scss';

function Chat(props) {
  const dispatch = useDispatch();
  const { chatRooms } = useSelector(state => ({
    chatRooms: state.chats.rooms
  }));
  useEffect(() => {
    const chat_ids = Object.keys(chatRooms);

    if (!chat_ids.length) {
      dispatch(populateChats());
    } else {
      chat_ids.forEach(chat_id => {
        sockets.join(chat_id);
      });
    }
  }, [chatRooms, dispatch]);
  return (
    <section className={styles.Chat}>
      <div className={styles.top}>
        <Log />
        <UserList />
      </div>
      <Interface />
    </section>
  );
}

export default Chat;
