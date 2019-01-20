import PropTypes from 'prop-types';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Button as CarbonButton } from 'carbon-components-react';

@autobind
export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: f => f
  };

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <CarbonButton type="submit" {...this.props} onClick={this.handleClick}>
        {this.props.children}
      </CarbonButton>
    );
  }
}
