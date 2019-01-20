import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import ContentSwitcher from './Contentswitcher';

class StyledContentSwitcher extends Component {
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
    return <ContentSwitcher {...props} style={this.style} />;
  }
}

export default styled(withTheme(StyledContentSwitcher))``;
