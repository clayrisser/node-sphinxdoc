import React from 'react';
import { ThemeProvider } from 'styled-components';

export function wrapRootElement(properties) {
  const { element } = properties;
  return <ThemeProvider theme={{}}>{element}</ThemeProvider>;
}

export default { wrapRootElement };
