import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Checkbox from './Checkbox';

class StyledCheckbox extends Component {
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
    return <Checkbox {...props} style={this.style} />;
  }
}

export default styled(withTheme(StyledCheckbox))``;
