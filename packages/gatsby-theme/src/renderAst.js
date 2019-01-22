/* eslint react/prop-types: off */
import React, { createElement } from 'react';
import RehypeReact from 'rehype-react';
import CodeSnippet from '~/components/CodeSnippet';
import H1 from '~/components/H1';
import H2 from '~/components/H2';
import H3 from '~/components/H3';
import Link from '~/components/Link';
import P from '~/components/P';
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
    p: P,
    table: Table,
    tbody: TableBody,
    td: TableData,
    th: TableHeader,
    thead: TableHead,
    tr: TableRow
  }
}).Compiler;
