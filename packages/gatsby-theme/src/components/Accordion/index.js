import './index.scss';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';

export { AccordionItem };

export default styled(
  withTheme(props => {
    return <Accordion {...props} />;
  })
)``;
