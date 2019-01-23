import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Layout from '~/containers/Layout';
import View from '~/components/View';
import renderAst from '~/renderAst';

export default class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  get page() {
    return (this._page = this._page || this.props.data.markdownRemark);
  }

  renderHome() {
    if (!this.page) return <View />;
    return <View>{renderAst(this.page.htmlAst)}</View>;
  }

  render() {
    return (
      <Layout pages={this.pages} page={this.page}>
        {/* {this.renderHome()} */}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
