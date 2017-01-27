import React from 'react';
import styles from './layout.css';

export default () => (
  <header className={styles.header}>
    <h1 className={styles.headerTitle}>Print-A-Gif</h1>
    <h3 className={styles.headerText}>Convert gifs to flipbooks in the browser!</h3>
  </header>
);
