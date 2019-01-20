import React from 'react';
import { DropDown } from '~/components';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import View from '../View';

storiesOf('DropDown', module).add('Default DropDown', () => (
  <View>
    <DropDown
      onClick={action('clicked')}
      label="Label"
      ariaLabel="Dropdown"
      items={[
        { id: 'option-1', text: 'Option 1' },
        { id: 'option-2', text: 'Option 2' },
        { id: 'option-3', text: 'Option 3' }
      ]}
      itemToString={item => (item ? item.text : '')}
      onChange={action('changed')}
    />
  </View>
));
