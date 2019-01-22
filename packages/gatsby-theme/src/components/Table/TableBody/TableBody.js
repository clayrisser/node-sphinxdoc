import CarbonTableBody from 'carbon-components-react/es/components/TableBody';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TableBody extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return <CarbonTableBody {...this.props} />;
  }
}
