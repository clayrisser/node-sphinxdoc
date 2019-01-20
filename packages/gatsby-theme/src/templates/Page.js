import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Button from '~/components/Button';
import Layout from '~/containers/Layout';
import HTML from '~/components/HTML';
import H1 from '~/components/H1';
import H2 from '~/components/H2';

export default class Page extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props;
    const { frontmatter, html } = data.markdownRemark;
    return (
      <Layout>
        <H1>{frontmatter.title}</H1>
        <H2>{frontmatter.date}</H2>
        <Button>hi</Button>
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
