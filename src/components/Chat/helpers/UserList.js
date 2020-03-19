import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles.module.scss';

function UserList(props) {
  const { users } = useSelector(state => ({ users: state.chats.users }));

  if (!users.length) {
    return <p>Loading...</p>;
  }
  const test = [
    'asdlfkjsdflskjfslfkjsdfldskjsdflkjsdflkdsjfdslkfjsdlfkjdlkdfjsldkfjsldkfsjdkl'
  ];
  return (
    <div className={styles.UserList}>
      {test.map(nickname => (
        <p>{nickname}</p>
      ))}
    </div>
  );
}

export default UserList;
