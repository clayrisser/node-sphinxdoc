import React from 'react';
import { ContentSwitcher, Switch } from '~/components';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import View from '../View';

storiesOf('ContentSwitcher', module).add('Default ContentSwitcher', () => (
  <View>
    <ContentSwitcher onChange={action('changed')} selectedIndex={1}>
      <Switch name="one" text="First section" onClick={action('clicked')} />
      <Switch name="two" text="Second section" onClick={action('clicked')} />
      <Switch name="three" text="Third section" onClick={action('clicked')} />
    </ContentSwitcher>
  </View>
));
