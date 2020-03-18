import React from 'react';

import Log from './helpers/Log.js';
import UserList from './helpers/UserList.js';
import Interface from './helpers/Interface.js';

import styles from './styles.module.scss';

function Chat(props) {
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
