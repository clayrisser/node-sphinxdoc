import CarbonTable from 'carbon-components-react/es/components/Table';
import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    return <CarbonTable {...this.props} />;
  }
}
