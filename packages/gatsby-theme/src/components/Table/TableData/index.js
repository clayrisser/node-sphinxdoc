import React from 'react';
import styled, { withTheme } from 'styled-components';
import TableData from './TableData';

export default styled(
  withTheme(props => {
    return <TableData {...props} />;
  })
)``;
