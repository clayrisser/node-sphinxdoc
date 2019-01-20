import React, { Component } from 'react';
import { Link as CarbonLink } from 'carbon-components-react';

export default class Link extends Component {
  render() {
    return <CarbonLink {...this.props} />;
  }
}
