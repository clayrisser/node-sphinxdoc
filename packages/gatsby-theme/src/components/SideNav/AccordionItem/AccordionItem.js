import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AccordionItem as CarbonAccordionItem } from 'carbon-components-react';

export default class AccordionItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return <CarbonAccordionItem {...this.props} />;
  }
}
