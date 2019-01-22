import './index.scss';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import CodeSnippet from './CodeSnippet';

export default styled(
  withTheme(props => {
    return <CodeSnippet {...props} />;
  })
)``;
