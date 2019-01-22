import React, { Component } from 'react';
import { SideNavItems as CarbonSideNavItems } from 'carbon-components-react/es/components/UIShell';

export default class SideNavItems extends Component {
  render() {
    return <CarbonSideNavItems {...this.props} />;
  }
}
