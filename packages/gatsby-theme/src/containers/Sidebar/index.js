import React from 'react';
import styled, { withTheme } from 'styled-components';
import Sidebar from './Sidebar';

export default styled(
  withTheme(props => {
    return <Sidebar {...props} />;
  })
)``;
