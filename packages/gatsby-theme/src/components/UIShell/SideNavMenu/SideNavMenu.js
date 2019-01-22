import React, { Component } from 'react';
import { SideNavMenu as CarbonSideNavMenu } from 'carbon-components-react/es/components/UIShell';

export default class SideNavMenu extends Component {
  render() {
    return <CarbonSideNavMenu {...this.props} />;
  }
}
