import React, { Component } from 'react';
import { SideNavMenuItem as CarbonSideNavMenuItem } from 'carbon-components-react/es/components/UIShell';

export default class SideNavMenuItem extends Component {
  render() {
    return <CarbonSideNavMenuItem {...this.props} />;
  }
}
