import '~/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import View from '~/components/View';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default class Layout extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    pages: PropTypes.object.isRequired
  };

  render() {
    const { html } = this.props.page;
    return (
      <View>
        <Header />
        <Grid fluid>
          <Row>
            <Col>
              <Sidebar
                pages={this.props.pages}
                page={this.props.page}
                html={html || ''}
              />
            </Col>
            <Col>
              <View {...this.props} />
            </Col>
          </Row>
        </Grid>
        <Footer />
      </View>
    );
  }
}
