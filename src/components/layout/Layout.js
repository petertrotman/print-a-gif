import React from 'react';

import Header from './header/Header';
import Nav from './nav/Nav';
import Content from './content/Content';
import Footer from './footer/Footer';
import styles from './Layout.css';

const Layout = ({ children, ...childProps }) => (
  <div className={styles.layout}>
    <Header {...childProps} />
    <Nav {...childProps} />
    <Content {...childProps}>
      { children }
    </Content>
    <Footer {...childProps} />
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Layout;
