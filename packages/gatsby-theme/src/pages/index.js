import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import HTML from '~/components/HTML';
import Layout from '~/containers/Layout';
import View from '~/components/View';

export default class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  get page() {
    if (this._page) return this._page;
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    this._page = _.find(
      edges,
      edge => edge.node?.frontmatter?.path === '/'
    ).node;
    return this._page;
  }

  get pages() {
    if (this._pages) return this._pages;
    const { data } = this.props;
    this._pages = data.allMarkdownRemark;
    return this._pages;
  }

  renderHome() {
    if (!this.page) return <View />;
    return (
      <View>
        <HTML>{this.page.html}</HTML>
      </View>
    );
  }

  render() {
    return (
      <Layout pages={this.pages} page={this.page}>
        {this.renderHome()}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
