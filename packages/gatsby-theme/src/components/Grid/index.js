import React, { Component } from 'react';
import { Grid as FlexGrid } from 'react-flexbox-grid';
import Col from './Col';
import Row from './Row';

export { Col, Row };

export default class Grid extends Component {
  render() {
    return <FlexGrid fluid {...this.props} />;
  }
}
