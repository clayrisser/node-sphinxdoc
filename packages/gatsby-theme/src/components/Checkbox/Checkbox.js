import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as CarbonCheckbox } from 'carbon-components-react';
import View from '../View';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    style: PropTypes.object.isRequired
  };

  static defaultProps = {
    onChange: f => f
  };

  render() {
    const props = { ...this.props };
    delete props.className;
    delete props.style;
    return (
      <View className={this.props.className} style={this.props.style}>
        <CarbonCheckbox {...this.props} />
      </View>
    );
  }
}
