import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles.module.scss';

function UserList(props) {
  const { users } = useSelector(state => ({ users: state.chats.users }));

  if (!users.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.UserList}>
      {users.map(nickname => (
        <p key={nickname}>{nickname}</p>
      ))}
    </div>
  );
}

export default UserList;
