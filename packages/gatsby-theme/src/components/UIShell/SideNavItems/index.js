import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavItems from './SideNavItems';

export default styled(
  withTheme(props => {
    return <SideNavItems {...props} />;
  })
)``;
