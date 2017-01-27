import React from 'react';

import Header from './header/Header';
import Nav from './nav/Nav';
import Content from './content/Content';
import Footer from './footer/Footer';
import styles from './Layout.css';

export default props => (
  <div className={styles.layout}>
    <Header />
    <Nav />
    <Content>
      { props.children }
    </Content>
    <Footer />
  </div>
);

