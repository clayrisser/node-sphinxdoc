import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Form from './Form';

class StyledForm extends Component {
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
    return <Form {...props} style={this.style} />;
  }
}

export default styled(withTheme(StyledForm))``;
