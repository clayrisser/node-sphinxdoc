import './index.scss';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import Search from './Search';

export default styled(
  withTheme(props => {
    return <Search {...props} />;
  })
)`
  margin-bottom: 20px;
`;
