import React from 'react';
import styled, { withTheme } from 'styled-components';
import AccordionItem from './AccordionItem';

export default styled(
  withTheme(props => {
    return <AccordionItem {...props} />;
  })
)``;
