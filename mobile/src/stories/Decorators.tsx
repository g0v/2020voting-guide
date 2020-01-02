import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../';

export const themeDecorator = (storyFn: any) => (
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);
