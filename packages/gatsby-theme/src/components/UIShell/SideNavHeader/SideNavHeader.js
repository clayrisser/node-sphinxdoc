import React, { Component } from 'react';
import { SideNavHeader as CarbonSideNavHeader } from 'carbon-components-react/es/components/UIShell';

export default class SideNavHeader extends Component {
  render() {
    return <CarbonSideNavHeader {...this.props} />;
  }
}
