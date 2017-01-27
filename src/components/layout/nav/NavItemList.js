import React from 'react';
import styles from './Nav.css';

import NavItem from './NavItem';

const NavItemList = props => (
  <ol className={styles.navItemList}>
    { props.routes.map(route => (
      <NavItem
        key={route.id}
        route={route}
        active={props.activeRoute === route.id}
        disabled={!props.enabledRoutes.includes(route.id)}
        handleClick={e => props.handleClick(e, route.id)}
      />
    )) }
  </ol>
);

/* False positives from this rule */
/* eslint-disable react/no-unused-prop-types */
NavItemList.propTypes = {
  routes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  activeRoute: React.PropTypes.string.isRequired,
  enabledRoutes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default NavItemList;
