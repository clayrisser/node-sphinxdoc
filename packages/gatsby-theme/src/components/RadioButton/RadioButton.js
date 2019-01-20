import React from 'react';
import { RadioButton as CarbonRadioButton } from 'carbon-components-react';
import PropTypes from 'prop-types';
import View from '../View';

export default class RadioButton extends React.Component {
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
        <CarbonRadioButton value="standard" {...this.props} />
      </View>
    );
  }
}
