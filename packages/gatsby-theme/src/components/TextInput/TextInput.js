import PropTypes from 'prop-types';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { TextInput as CarbonTextInput } from 'carbon-components-react';

@autobind
export default class TextInput extends Component {
  state = {
    value: ''
  };

  static propTypes = {
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    labelText: '',
    type: 'text',
    value: null,
    onChange: f => f
  };

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    return (
      <CarbonTextInput
        {...this.props}
        labelText={this.props.labelText}
        type={this.props.type}
        value={this.props.value || this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
