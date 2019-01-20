import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownV2 as CarbonDropDown } from 'carbon-components-react';
import View from '../View';

export default class DropDown extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  };

  render() {
    const props = { ...this.props };
    delete props.className;
    delete props.style;
    return (
      <View className={this.props.className} style={this.props.style}>
        <CarbonDropDown {...this.props} />
      </View>
    );
  }
}
