import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavDetails from './SideNavDetails';

export default styled(
  withTheme(props => {
    return <SideNavDetails {...props} />;
  })
)``;
