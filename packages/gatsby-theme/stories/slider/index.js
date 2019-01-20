import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Slider } from '~/components';
import View from '../View';

storiesOf('Slider', module).add('Default Slider', () => (
  <View>
    <Slider
      id="slider"
      name=""
      inputType=""
      ariaLabelInput=""
      min={0}
      max={100}
      hideTextInput
      labelText="Slider Label"
      onChange={action('onChange')}
    />
  </View>
));
