import CarbonSideNav from 'carbon-components-react/es/components/SideNav';
import React, { Component } from 'react';

export default class SideNav extends Component {
  render() {
    return <CarbonSideNav {...this.props} />;
  }
}
