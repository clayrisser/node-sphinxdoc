import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import RadioButton from './RadioButton';

class StyledRadioButton extends React.Component {
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
    return <RadioButton {...props} style={this.style} />;
  }
}

export default styled(withTheme(StyledRadioButton))``;
