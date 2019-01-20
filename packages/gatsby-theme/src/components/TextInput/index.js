import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import TextInput from './TextInput';

class StyledTextInput extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired
  };

  get style() {
    return {
      ...this.props.style
    };
  }

  render() {
    const props = { ...this.props };
    return <TextInput {...props} style={this.style} light />;
  }
}

export default styled(withTheme(StyledTextInput))``;
