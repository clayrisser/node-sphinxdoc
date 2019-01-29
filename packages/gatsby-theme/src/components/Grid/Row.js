import React, { Component } from 'react';
import { Row as FlexRow } from 'react-flexbox-grid';

export default class Row extends Component {
  render() {
    return <FlexRow {...this.props} />;
  }
}
