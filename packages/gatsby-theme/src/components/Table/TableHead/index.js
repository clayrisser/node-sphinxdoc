import React from 'react';
import styled, { withTheme } from 'styled-components';
import TableHead from './TableHead';

export default styled(
  withTheme(props => {
    return <TableHead {...props} />;
  })
)``;
