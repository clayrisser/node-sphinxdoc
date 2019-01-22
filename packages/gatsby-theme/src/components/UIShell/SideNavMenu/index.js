import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavMenu from './SideNavMenu';

export default styled(
  withTheme(props => {
    return <SideNavMenu {...props} />;
  })
)``;
