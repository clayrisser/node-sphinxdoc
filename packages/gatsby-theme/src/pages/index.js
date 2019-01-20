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

  renderPosts() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    return _.map(edges, (edge, i) => {
      const { node } = edge;
      return (
        <View key={key(i)}>
          <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
        </View>
      );
    });
  }

  renderHome() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    const edge = _.find(edges, edge => edge.node?.frontmatter?.path === '/');
    if (!edge) return <View />;
    const { node } = edge;
    return <HTML>{node.html}</HTML>;
  }

  render() {
    return (
      <Layout>
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
