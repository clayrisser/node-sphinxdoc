import React from 'react';
import { ThemeProvider } from 'styled-components';
import './src/styles';

export function wrapRootElement({ element }) {
  return <ThemeProvider theme={{}}>{element}</ThemeProvider>;
}

export default { wrapRootElement };
