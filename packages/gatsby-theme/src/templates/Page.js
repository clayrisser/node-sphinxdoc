import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import HTML from '~/components/HTML';
import Layout from '~/containers/Layout';
import View from '~/components/View';

export default class Page extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  get page() {
    if (this._page) return this._page;
    const { data } = this.props;
    this._page = data.markdownRemark;
    return this._page;
  }

  get pages() {
    if (this._pages) return this._pages;
    const { data } = this.props;
    this._pages = data.allMarkdownRemark;
    return this._pages;
  }

  render() {
    if (!this.page) return <View />;
    const { html } = this.page;
    return (
      <Layout pages={this.pages} page={this.page}>
        <HTML>{html}</HTML>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
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
