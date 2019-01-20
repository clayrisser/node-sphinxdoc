import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import HTML from '~/components/HTML';
import Layout from '~/containers/Layout';
import Link from '~/components/Link';
import View from '~/components/View';
import key from '~/reactUniqueKey';

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

  renderPosts() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    return _.map(edges, (edge, i) => {
      const page = edge.node;
      return (
        <View key={key(i)}>
          <Link to={page.frontmatter.path}>{page.frontmatter.title}</Link>
        </View>
      );
    });
  }

  renderHome() {
    if (!this.page) return <View />;
    return <HTML>{this.page.html}</HTML>;
  }

  render() {
    return (
      <Layout page={this.page}>
        {this.renderPosts()}
        {this.renderHome()}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query allPages {
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
