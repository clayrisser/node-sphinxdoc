import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return <div style={{ padding: '20px' }}>{this.props.children}</div>;
  }
}
