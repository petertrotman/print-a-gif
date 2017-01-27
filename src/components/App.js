import React from 'react';
import Layout from './layout/Layout';

import routes from './routes';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeRoute: 'select',
      enabledRoutes: ['select', 'process'],
    };
  }

  get layoutProps() {
    return {
      activeRoute: this.state.activeRoute,
      enabledRoutes: this.state.enabledRoutes,
      handleClick: (e, r) => {
        e.preventDefault();
        this.setState({ activeRoute: r });
      },
    };
  }

  get activeRouteComponent() {
    const route = routes.find(r => r.id === this.state.activeRoute);
    return (route && route.component) || <p>Something went wrong...</p>;
  }

  render() {
    const ActiveRouteComponent = this.activeRouteComponent;
    return (
      <Layout {...this.layoutProps}>
        <ActiveRouteComponent />
      </Layout>
    );
  }
}
