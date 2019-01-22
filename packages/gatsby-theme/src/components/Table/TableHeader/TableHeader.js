import CarbonTableHeader from 'carbon-components-react/es/components/TableHeader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TableHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return <CarbonTableHeader {...this.props} />;
  }
}
