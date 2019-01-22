import React from 'react';
import styled, { withTheme } from 'styled-components';
import TableBody from './TableBody';

export default styled(
  withTheme(props => {
    return <TableBody {...props} />;
  })
)``;
