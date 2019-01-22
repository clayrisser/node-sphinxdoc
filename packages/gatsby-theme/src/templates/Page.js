import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Layout from '~/containers/Layout';
import View from '~/components/View';
import renderAst from '~/renderAst';

export default class Page extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  get page() {
    return (this._page = this._page || this.props.data.markdownRemark);
  }

  render() {
    if (!this.page) return <View />;
    return <Layout>{renderAst(this.page.htmlAst)}</Layout>;
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
