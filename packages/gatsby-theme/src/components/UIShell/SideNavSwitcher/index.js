import React from 'react';
import styled, { withTheme } from 'styled-components';
import SideNavSwitcher from './SideNavSwitcher';

export default styled(
  withTheme(props => {
    return <SideNavSwitcher {...props} />;
  })
)``;
