import './index.scss';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import TextInput from './TextInput';

export default styled(
  withTheme(props => {
    return <TextInput {...props} />;
  })
)``;
