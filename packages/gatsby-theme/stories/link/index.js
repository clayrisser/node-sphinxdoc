import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Link from '~/components/Link';
import Layout from '../Layout';

storiesOf('Link', module).add('Default Link', () => (
  <Layout>
    <Link
      className="some-class"
      href="https://example.com"
      onClick={action('onClick')}
    >
      Link
    </Link>
  </Layout>
));
