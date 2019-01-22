import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavLink from './SideNavLink';

export default styled(
  withTheme(props => {
    return <SideNavLink {...props} />;
  })
)``;
