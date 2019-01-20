import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import cheerio from 'cheerio';
import Accordion, { AccordionItem } from '~/components/Accordion';
import Link from '~/components/Link';
import View from '~/components/View';
import key from '~/reactUniqueKey';
import H3 from '~/components/H3';

export default class Sidebar extends Component {
  static propTypes = {
    html: PropTypes.string
  };

  static defaultProps = {
    html: '<h2>I</h2><h4>A</h3><h4>B</h3><h2>II</h2><h3>1</h3><h3>2</h3>'
  };

  get headerTree() {
    if (this._headerTree) return this._headerTree;
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
    const $ = cheerio.load(this.props.html);
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
    this._headerTree = headerTree;
    return this._headerTree;
  }

  get headers() {
    if (this._headers) return this._headers;
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

    this._headers = getHeaders(this.headerTree);
    return this._headers;
  }

  renderSubHeaders(subHeaders) {
    return _.map(subHeaders, (subHeader, i) => {
      return (
        <H3 key={key(i)}>
          <Link to="/somthing">{subHeader.label}</Link>
        </H3>
      );
    });
  }

  renderHeaders() {
    return _.map(this.headers, (header, i) => {
      return (
        <AccordionItem key={key(i)} title={header.label}>
          {this.renderSubHeaders(header.children)}
        </AccordionItem>
      );
    });
  }

  render() {
    return (
      <View>
        <Accordion>{this.renderHeaders()}</Accordion>
      </View>
    );
  }
}
