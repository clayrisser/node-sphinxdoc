import React from 'react';
import { ThemeProvider } from 'styled-components';

export function wrapRootElement({ element }) {
  return <ThemeProvider theme={{}}>{element}</ThemeProvider>;
}

export default { wrapRootElement };
