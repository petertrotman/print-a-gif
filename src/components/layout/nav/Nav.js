import React from 'react';
import styles from './Nav.css';

import NavItemList from './NavItemList';
import routes from '../../routes';

const navRouteIds = ['select', 'process', 'customise', 'finalise'];
const navRoutes = routes.filter(r => navRouteIds.includes(r.id));

const Nav = props => (
  <nav className={styles.nav}>
    <NavItemList
      routes={navRoutes}
      activeRoute={props.activeRoute}
      enabledRoutes={props.enabledRoutes}
      handleClick={props.handleClick}
    />
  </nav>
);

Nav.propTypes = {
  activeRoute: React.PropTypes.string.isRequired,
  enabledRoutes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default Nav;
