import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import HTML from '~/components/HTML';
import Layout from '~/containers/Layout';
import View from '~/components/View';

export default class Page extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  get page() {
    return (this._page = this._page || this.props.data.markdownRemark);
  }

  render() {
    if (!this.page) return <View />;
    return (
      <Layout>
        <HTML>{this.page.html}</HTML>
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
  }
`;
