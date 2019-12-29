import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@material-ui/core';

export default {
  title: 'Button',
};

export const testButton = () => (
  <Button>
    {'test'}
  </Button>
)
