import React, { Component } from 'react';
import { Accordion as CarbonAccordion } from 'carbon-components-react';

export default class Accordion extends Component {
  render() {
    return <CarbonAccordion {...this.props} />;
  }
}
