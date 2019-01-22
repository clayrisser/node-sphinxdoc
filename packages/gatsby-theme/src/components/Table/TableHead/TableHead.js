import CarbonTableHead from 'carbon-components-react/es/components/TableHead';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TableHead extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return <CarbonTableHead {...this.props} />;
  }
}
