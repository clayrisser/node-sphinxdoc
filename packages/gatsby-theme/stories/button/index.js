import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Button } from '~/components';
import View from '../View';

storiesOf('Button', module).add('Default Button', () => (
  <View>
    <Button onClick={action('Hello, world!')}>Hello, world!</Button>
  </View>
));
