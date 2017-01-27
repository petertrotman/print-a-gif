import React from 'react';
import styles from './Content.css';

export default props => (
  <div className={styles.content}>
    { props.children }
  </div>
);
