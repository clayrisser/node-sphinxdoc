import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ContentSwitcher as CarbonContentSwitcher } from 'carbon-components-react';

export default class ContentSwitcher extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: f => f
  };

  render() {
    return (
      <CarbonContentSwitcher {...this.props}>
        {this.props.children}
      </CarbonContentSwitcher>
    );
  }
}
