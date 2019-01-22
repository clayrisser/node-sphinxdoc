import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavMenuItem from './SideNavMenuItem';

export default styled(
  withTheme(props => {
    return <SideNavMenuItem {...props} />;
  })
)``;
