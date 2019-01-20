import React, { Component } from 'react';
import { Form as CarbonForm } from 'carbon-components-react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <CarbonForm {...this.props}>{this.props.children}</CarbonForm>;
  }
}
