import React, { Component } from 'react';
import { SideNav as CarbonSideNav } from 'carbon-components-react/es/components/UIShell';

export default class SideNav extends Component {
  render() {
    return <CarbonSideNav {...this.props} />;
  }
}
