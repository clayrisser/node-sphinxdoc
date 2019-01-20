import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link as GatsbyLink } from 'gatsby';

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  };

  render() {
    return (
      <GatsbyLink
        className={classNames('bx--link', this.props.className)}
        {...this.props}
      />
    );
  }
}
