import React from 'react';
import styles from './Content.css';

const Content = props => (
  <main className={styles.content}>
    { props.children }
  </main>
);

Content.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Content;
