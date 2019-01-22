import React, { Component } from 'react';
import { SideNavLink as CarbonSideNavLink } from 'carbon-components-react/es/components/UIShell';

export default class SideNavLink extends Component {
  render() {
    return <CarbonSideNavLink {...this.props} />;
  }
}
