import React from 'react'
import { ThemeProvider } from "@material-ui/core";
import { theme } from "..";

export const themeDecorator = (storyFn: any) => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
)