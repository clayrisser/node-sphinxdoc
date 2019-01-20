import React from 'react';
import styled, { withTheme } from 'styled-components';
import Button from './Button';

export default styled(
  withTheme(props => {
    const style = {
      ...props.style
    };

    return <Button {...props} style={style} />;
  })
)`
  background-color: orange;
`;
