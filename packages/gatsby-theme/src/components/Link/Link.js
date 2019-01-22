import CarbonLink from 'carbon-components-react/es/components/Link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link as GatsbyLink } from 'gatsby';

export default class Link extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    target: PropTypes.string,
    to: PropTypes.string
  };

  static defaultProps = {
    target: '_blank',
    to: '#'
  };

  render() {
    if (/[a-zA-Z]+:\/{2}[^/]+/.test(this.props.to)) {
      const props = { ...this.props };
      delete props.to;
      return <CarbonLink href={this.props.to} {...props} />;
    }
    const props = { ...this.props };
    delete props.className;
    delete props.target;
    return (
      <GatsbyLink
        {...props}
        className={classNames('bx--link', this.props.className)}
      />
    );
  }
}
