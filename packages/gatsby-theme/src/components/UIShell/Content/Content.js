import React, { Component } from 'react';
import { Content as CarbonContent } from 'carbon-components-react/es/components/UIShell';

export default class Content extends Component {
  render() {
    return <CarbonContent {...this.props} />;
  }
}
