import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import queryString from 'query-string';
import { Index } from 'elasticlunr';
import { graphql } from 'gatsby';
import H1 from '~/components/H1';
import H2 from '~/components/H2';
import Layout from '~/containers/Layout';
import Link from '~/components/Link';
import View from '~/components/View';

export default class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  get index() {
    return (this._index =
      this._index || Index.load(this.props.data.siteSearchIndex.index));
  }

  get query() {
    return queryString.parse(this.props.location.search)?.q || '';
  }

  search(query) {
    return this.index
      .search(query, {})
      .map(({ ref }) => this.index.documentStore.getDoc(ref));
  }

  renderResults(results) {
    if (!results.length) return <View>No results found</View>;
    return _.map(results, result => {
      return (
        <Link to={result.path}>
          <H2>{result.title}</H2>
        </Link>
      );
    });
  }

  render() {
    return (
      <Layout pages={this.pages} page={this.page}>
        <H1>Search Results</H1>
        {this.renderResults(this.search(this.query))}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    siteSearchIndex {
      index
    }
  }
`;
