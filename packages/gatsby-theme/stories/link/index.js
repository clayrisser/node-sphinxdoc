import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Link } from '~/components';
import View from '../View';

storiesOf('Link', module).add('Default Link', () => (
  <View>
    <Link
      className="some-class"
      href="https://example.com"
      onClick={action('onClick')}
    >
      Link
    </Link>
  </View>
));
