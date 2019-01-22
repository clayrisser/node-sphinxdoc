import React from 'react';
import styled, { withTheme } from 'styled-components';
import Content from './Content';

export default styled(
  withTheme(props => {
    return <Content {...props} />;
  })
)``;
