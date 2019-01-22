import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import cheerio from 'cheerio';
import { Location } from '@reach/router';
import { StaticQuery, graphql } from 'gatsby';
import Accordion, { AccordionItem } from '~/components/Accordion';
import H3 from '~/components/H3';
import Link from '~/components/Link';
import key from '~/reactUniqueKey';

class Sidebar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  get pages() {
    if (this._pages) return this._pages;
    this._pages = _.map(
      this.props.data?.allMarkdownRemark?.edges || [],
      'node'
    );
    return this._pages;
  }

  get path() {
    const { pathname } = this.props.location;
    if (pathname.length > 1 && pathname[pathname.length - 1] === '/') {
      return pathname.substr(0, pathname.length - 1);
    }
    return pathname;
  }

  getHeaderTree(html) {
    const headerTree = [];
    function updateHeaderTree(level, label) {
      function setHeader(subTree = [], currentLevel = 0) {
        if (currentLevel === level) {
          subTree.push({
            label,
            header: `h${currentLevel + 1}`,
            children: []
          });
          return subTree;
        }
        if (!subTree.length) {
          subTree.push({
            children: []
          });
        }
        return setHeader(subTree[subTree.length - 1].children, ++currentLevel);
      }
      setHeader(headerTree);
      return headerTree;
    }
    const $ = cheerio.load(html);
    _.each($(':header'), element => {
      const label = $(element).text();
      if (
        element.name.length === 2 &&
        element.name[0] === 'h' &&
        !_.isNaN(element.name[1])
      ) {
        updateHeaderTree(Number(element.name[1]) - 1, label);
      }
    });
    return headerTree;
  }

  getHeaders(html) {
    const headerTree = this.getHeaderTree(html);
    function getHeaders(subTree) {
      if (!subTree.length) return [];
      if (!subTree[0].label) {
        return getHeaders(subTree[0].children);
      }
      const headers = [];
      _.each(subTree, (node, i) => {
        headers[i] = {
          label: node.label,
          header: node.header,
          children: getHeaders(node.children)
        };
      });
      return headers;
    }
    return getHeaders(headerTree);
  }

  renderSubHeaders(rootPath, subHeaders) {
    return _.map(subHeaders, (subHeader, i) => {
      return (
        <H3 key={key(i)}>
          <Link
            to={`${rootPath}#${_.snakeCase(subHeader.label).replace(
              /_/g,
              '-'
            )}`}
          >
            {subHeader.label}
          </Link>
        </H3>
      );
    });
  }

  renderHeaders() {
    return _.map(_.sortBy(this.pages, 'frontmatter.path'), (page, i) => {
      const headers = this.getHeaders(page.html);
      return (
        <AccordionItem
          open={page.frontmatter.path === this.path}
          key={key(i)}
          title={page.frontmatter.title}
        >
          {this.renderSubHeaders(
            page.frontmatter.path,
            _.find(headers, header => header.label === page.frontmatter.title)
              .children
          )}
        </AccordionItem>
      );
    });
  }

  render() {
    return <Accordion>{this.renderHeaders()}</Accordion>;
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              html
              tableOfContents(pathToSlugField: "frontmatter.path")
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Location>
        {locationProps => <Sidebar data={data} {...locationProps} {...props} />}
      </Location>
    )}
  />
);
