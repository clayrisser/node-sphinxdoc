import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import Switch from './Switch';

class StyledSwitch extends Component {
  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  get style() {
    return {
      ...this.props.style
    };
  }

  render() {
    const props = { ...this.props };
    return <Switch {...props} style={this.style} />;
  }
}

export default styled(withTheme(StyledSwitch))``;
