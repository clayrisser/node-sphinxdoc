import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavHeader from './SideNavHeader';

export default styled(
  withTheme(props => {
    return <SideNavHeader {...props} />;
  })
)``;
