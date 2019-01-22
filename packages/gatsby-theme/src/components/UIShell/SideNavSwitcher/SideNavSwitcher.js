import React, { Component } from 'react';
import { SideNavSwitcher as CarbonSideNavSwitcher } from 'carbon-components-react/es/components/UIShell';

export default class SideNavSwitcher extends Component {
  render() {
    return <CarbonSideNavSwitcher {...this.props} />;
  }
}
