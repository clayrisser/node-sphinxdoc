import '~/styles';
import React, { Component } from 'react';
import View from '~/components/View';
import { Content } from '~/components/UIShell';
import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <Content>
          <View {...this.props} />
        </Content>
        <Footer />
      </>
    );
  }
}
