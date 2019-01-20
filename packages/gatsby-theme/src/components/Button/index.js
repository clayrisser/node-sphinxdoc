import React from 'react';
import styled, { withTheme } from 'styled-components';
import './index.scss';
import Button from './Button';

export default styled(
  withTheme(props => {
    return <Button {...props} />;
  })
)``;
