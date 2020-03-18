import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../styles.module.scss';

function Interface(props) {
  const [message, setMessage] = useState('');

  const handleMessageChange = e => {
    const limit = parseInt(process.env.REACT_APP_CHAR_LIMIT, 10);
    if (e.target.value.length <= limit) {
      setMessage(e.target.value);
    }
  };
  return (
    <form className={styles.Interface}>
      <textarea value={message} onChange={e => handleMessageChange(e)} />
      <div className={styles.buttonContainer}>
        <FontAwesomeIcon icon={['fal', 'paper-plane']} />
        <button type="submit" style={{ display: 'none' }} />
      </div>
    </form>
  );
}

export default Interface;
