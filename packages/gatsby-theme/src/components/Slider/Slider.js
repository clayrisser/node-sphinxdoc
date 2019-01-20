import PropTypes from 'prop-types';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Slider as CarbonSlider } from 'carbon-components-react';
import View from '../View';

@autobind
export default class Slider extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    sliderStyle: PropTypes.object,
    style: PropTypes.object.isRequired,
    value: PropTypes.number
  };

  static defaultProps = {
    onChange: f => f,
    value: 0,
    sliderStyle: {}
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value
    };
  }

  handleChange({ value }) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const props = { ...this.props };
    delete props.className;
    delete props.style;
    delete props.sliderStyle;
    return (
      <View className={this.props.className} style={this.props.style}>
        <CarbonSlider
          {...props}
          onChange={this.handleChange}
          style={this.props.sliderStyle}
          value={this.props.value || this.state.value}
        />
      </View>
    );
  }
}
