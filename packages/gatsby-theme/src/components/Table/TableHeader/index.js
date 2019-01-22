import React from 'react';
import styled, { withTheme } from 'styled-components';
import TableHeader from './TableHeader';

export default styled(
  withTheme(props => {
    return <TableHeader {...props} />;
  })
)``;
