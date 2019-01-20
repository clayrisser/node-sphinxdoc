import React from 'react';
import { Checkbox } from '~/components';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import View from '../View';

storiesOf('Checkbox', module).add('Default Checkbox', () => (
  <View>
    <Checkbox
      id="checkbox-label-1"
      labelText="I agree to Instride's terms of services and privacy policy"
      onChange={action('onChange')}
    />
  </View>
));
