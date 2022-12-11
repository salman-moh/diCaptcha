import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import theme from 'src/config/theme';

export function MuiThemeProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
