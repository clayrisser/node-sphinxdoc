import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class HTML extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    const props = { ...this.props };
    delete props.children;
    return (
      <div
        {...props}
        dangerouslySetInnerHTML={{ __html: this.props.children }}
      />
    );
  }
}
