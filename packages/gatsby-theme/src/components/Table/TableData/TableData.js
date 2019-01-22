import CarbonTableData from 'carbon-components-react/es/components/TableData';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TableData extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return <CarbonTableData {...this.props} />;
  }
}
