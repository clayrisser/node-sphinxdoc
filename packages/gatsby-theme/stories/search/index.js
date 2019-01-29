import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Search from '~/components/Search';
import Layout from '../Layout';

storiesOf('Search', module).add('Defaut Search', () => (
  <Layout>
    <Search
      id="some-text-input"
      placeholder="some-placeholder"
      onChange={action('changed')}
    />
  </Layout>
));
