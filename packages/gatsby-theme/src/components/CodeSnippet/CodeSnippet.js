import CarbonCodeSnippet from 'carbon-components-react/es/components/CodeSnippet';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CodeSnippet extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    let { children } = this.props;
    if (_.isArray(children)) children = children.join('\n');
    return <CarbonCodeSnippet {...this.props}>{children}</CarbonCodeSnippet>;
  }
}
