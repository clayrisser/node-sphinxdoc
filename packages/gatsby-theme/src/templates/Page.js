import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import H1 from '~/components/H1';
import H2 from '~/components/H2';
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

  render() {
    if (!this.page) return <View />;
    const { frontmatter, html } = this.page;
    return (
      <Layout page={this.page}>
        <H1>{frontmatter.title}</H1>
        <H2>{frontmatter.date}</H2>
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
  }
`;
