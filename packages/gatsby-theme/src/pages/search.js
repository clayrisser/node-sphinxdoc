import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Index } from 'elasticlunr';
import { graphql } from 'gatsby';
import Layout from '~/containers/Layout';
import TextInput from '~/components/TextInput';

export default class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  state = {
    query: ''
  };

  get index() {
    return (this._index =
      this._index || Index.load(this.props.data.siteSearchIndex.index));
  }

  search(query) {
    return this.index
      .search(query, {})
      .map(({ ref }) => this.index.documentStore.getDoc(ref));
  }

  render() {
    return (
      <Layout pages={this.pages} page={this.page}>
        <TextInput onChange={query => this.setState({ query })} />
        {JSON.stringify(this.search(this.state.query))}
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
