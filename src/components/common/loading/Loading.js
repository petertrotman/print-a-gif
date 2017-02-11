import React from 'react';
import styles from './Loading.css';

export default () => (
  <div className={styles.wrapper}>
    <div className={styles.loader}>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </div>
  </div>
);
