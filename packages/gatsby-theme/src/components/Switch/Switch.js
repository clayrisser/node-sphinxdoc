import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch as CarbonSwitch } from 'carbon-components-react';

export default class Switch extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    return (
      <CarbonSwitch
        {...this.props}
        name={this.props.name}
        text={this.props.text}
      />
    );
  }
}
