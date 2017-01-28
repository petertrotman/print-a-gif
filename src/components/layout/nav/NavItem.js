import React from 'react';
import styles from './Nav.css';

const NavItem = props => (
  <li className={styles.navItem}>
    <a
      href={props.route.path}
      className={
        `${styles.navItemLink} ` +
        `${props.active ? styles.navItemLinkActive : ''} ` +
        `${props.disabled ? styles.navItemLinkDisabled : ''} `
      }
      onClick={props.handleClick}
    >
      { props.route.name }
    </a>
  </li>
);

NavItem.propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  handleClick: React.PropTypes.func.isRequired,
  route: React.PropTypes.shape({
    path: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

NavItem.defaultProps = {
  active: false,
  disabled: false,
};

export default NavItem;
