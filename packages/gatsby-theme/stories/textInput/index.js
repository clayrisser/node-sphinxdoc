import React from 'react';
import { TextInput } from '~/components';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import View from '../View';

storiesOf('TextInput', module).add('Defaut TextInput', () => (
  <View>
    <TextInput
      id="some-text-input"
      placeholder="placeholder"
      onChange={action('changed')}
    />
  </View>
));
