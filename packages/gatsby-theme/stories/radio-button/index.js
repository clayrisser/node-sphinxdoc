import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RadioButton } from '~/components';
import View from '../View';

storiesOf('RadioButton', module).add('Default RadioButton', () => (
  <View>
    <RadioButton
      labelText="Standard Radio Button"
      value="standard"
      onChange={action('onChange')}
    />
  </View>
));
