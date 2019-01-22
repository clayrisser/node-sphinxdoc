import React, { Component } from 'react';
import { SideNavDetails as CarbonSideNavDetails } from 'carbon-components-react/es/components/UIShell';

export default class SideNavDetails extends Component {
  render() {
    return <CarbonSideNavDetails {...this.props} />;
  }
}
