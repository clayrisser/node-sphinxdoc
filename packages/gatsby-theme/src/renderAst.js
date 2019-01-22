/* eslint react/prop-types: off */
import React, { createElement } from 'react';
import CodeSnippet from '~/components/CodeSnippet';
import H1 from '~/components/H1';
import H2 from '~/components/H2';
import H3 from '~/components/H3';
import LI from '~/components/LI';
import Link from '~/components/Link';
import OL from '~/components/OL';
import P from '~/components/P';
import RehypeReact from 'rehype-react';
import UL from '~/components/UL';
import Table, {
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/Table';

export default new RehypeReact({
  createElement,
  components: {
    a: ({ href, ...props }) => <Link to={href} {...props} />,
    code: CodeSnippet,
    h1: H1,
    h2: H2,
    h3: H3,
    li: LI,
    ol: OL,
    p: P,
    table: Table,
    tbody: TableBody,
    td: TableData,
    th: TableHeader,
    thead: TableHead,
    tr: TableRow,
    ul: UL
  }
}).Compiler;
