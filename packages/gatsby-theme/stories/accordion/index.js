import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion, { AccordionItem } from '~/components/Accordion';
import Layout from '../Layout';

storiesOf('Accordion', module).add('Default Accordion', () => (
  <Layout>
    <Accordion>
      <AccordionItem title="one">One</AccordionItem>
      <AccordionItem title="two">Two</AccordionItem>
      <AccordionItem title="three">Three</AccordionItem>
    </Accordion>
  </Layout>
));
