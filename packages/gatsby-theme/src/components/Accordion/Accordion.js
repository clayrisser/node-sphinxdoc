import CarbonAccordion from 'carbon-components-react/es/components/Accordion';
import React, { Component } from 'react';

export default class Accordion extends Component {
  render() {
    return <CarbonAccordion {...this.props} />;
  }
}
