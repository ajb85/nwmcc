import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Log from './helpers/Log.js';
import UserList from './helpers/UserList.js';
import Interface from './helpers/Interface.js';

import sockets from 'sockets/';

import styles from './styles.module.scss';

function Chat(props) {
  const { chatRooms } = useSelector(state => ({
    chatRooms: state.chats.rooms
  }));
  useEffect(() => {
    Object.keys(chatRooms).forEach(chat_id => {
      sockets.join(chat_id);
    });
  }, [chatRooms]);
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
