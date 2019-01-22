import './index.scss';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import Table from './Table';
import TableBody from './TableBody';
import TableData from './TableData';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export { TableBody, TableData, TableHead, TableHeader, TableRow };

export default styled(
  withTheme(props => {
    return <Table {...props} />;
  })
)`
  margin-bottom: 20px;
`;
