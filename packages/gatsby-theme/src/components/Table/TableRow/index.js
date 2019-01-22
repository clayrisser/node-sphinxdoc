import React from 'react';
import styled, { withTheme } from 'styled-components';
import TableRow from './TableRow';

export default styled(
  withTheme(props => {
    return <TableRow {...props} />;
  })
)``;
