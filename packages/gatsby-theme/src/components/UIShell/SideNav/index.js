import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNav from './SideNav';

export default styled(
  withTheme(props => {
    return <SideNav {...props} />;
  })
)``;
