import '~/styles';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import View from '~/components/View';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default class Layout extends Component {
  render() {
    return (
      <View>
        <Header />
        <Grid fluid>
          <Row>
            <Col>
              <Sidebar />
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
