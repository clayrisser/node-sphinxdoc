import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import CodeSnippet from '~/components/CodeSnippet';
import H1 from '~/components/H1';
import H2 from '~/components/H2';
import H3 from '~/components/H3';
import Layout from '~/containers/Layout';
import P from '~/components/P';
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
    const renderAst = new RehypeReact({
      createElement: React.createElement,
      components: {
        code: CodeSnippet,
        h1: H1,
        h2: H2,
        h3: H3,
        p: P
      }
    }).Compiler;
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
