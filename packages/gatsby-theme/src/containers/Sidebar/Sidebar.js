import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import cheerio from 'cheerio';
import { List24 } from '@carbon/icons-react';
import { Location } from '@reach/router';
import { StaticQuery, graphql } from 'gatsby';
import Link from '~/components/Link';
import View from '~/components/View';
import {
  SideNav,
  SideNavDetails,
  SideNavMenu,
  SideNavMenuItem,
  SideNavHeader
} from '~/components/UIShell';
import key from '~/reactUniqueKey';

class Sidebar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  get pages() {
    return (this._pages =
      this._pages ||
      _.map(this.props.data?.allMarkdownRemark?.edges || [], 'node'));
  }

  get path() {
    const { pathname } = this.props.location;
    if (pathname.length > 1 && pathname[pathname.length - 1] === '/') {
      return pathname.substr(0, pathname.length - 1);
    }
    return pathname;
  }

  get title() {
    return (this._title =
      this._title || this.props.data?.site?.siteMetadata?.title || '');
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
        <Link
          to={`${rootPath}#${_.snakeCase(subHeader.label).replace(/_/g, '-')}`}
        >
          <SideNavMenuItem
            key={key(i)}
            to={`${rootPath}#${_.snakeCase(subHeader.label).replace(
              /_/g,
              '-'
            )}`}
          >
            {subHeader.label}
          </SideNavMenuItem>
        </Link>
      );
    });
  }

  renderHeaders() {
    return _.map(_.sortBy(this.pages, 'frontmatter.path'), (page, i) => {
      const headers = this.getHeaders(page.html);
      return (
        <SideNavMenu
          defaultExpanded={page.frontmatter.path === this.path}
          isActive={page.frontmatter.path === this.path}
          icon={<List24 />}
          key={key(i)}
          title={page.frontmatter.title}
        >
          {this.renderSubHeaders(
            page.frontmatter.path,
            (
              _.find(
                headers,
                header => header.label === page.frontmatter.title
              ) || headers?.[0]
            )?.children || []
          )}
        </SideNavMenu>
      );
    });
  }

  render() {
    return (
      <SideNav>
        <View>
          <SideNavHeader>
            <SideNavDetails title={this.title} />
          </SideNavHeader>
          {this.renderHeaders()}
        </View>
      </SideNav>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark {
          edges {
            node {
              html
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
