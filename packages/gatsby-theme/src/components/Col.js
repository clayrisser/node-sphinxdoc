import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col as FlexCol } from 'react-flexbox-grid';

export default class Col extends Component {
  static propTypes = {
    all: PropTypes.number,
    desktop: PropTypes.number,
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number
  };

  static defaultProps = {
    all: null,
    desktop: null,
    lg: null,
    md: null,
    sm: null,
    xs: null
  };

  render() {
    const { all, desktop } = this.props;
    let xs = null;
    let sm = null;
    let md = null;
    let lg = null;
    if (all) {
      xs = all;
      sm = all;
      md = all;
      lg = all;
    }
    if (desktop) {
      md = desktop;
      lg = desktop;
    }
    if (this.props.xs) {
      ({ xs } = this.props);
    }
    if (this.props.sm) {
      ({ sm } = this.props);
    }
    if (this.props.sm) {
      ({ md } = this.props);
    }
    if (this.props.sm) {
      ({ lg } = this.props);
    }
    return <FlexCol {...this.props} xs={xs} sm={sm} md={md} lg={lg} />;
  }
}
