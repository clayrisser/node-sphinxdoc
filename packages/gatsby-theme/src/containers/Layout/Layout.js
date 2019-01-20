import React, { Component } from 'react';
import View from '~/components/View';
import Footer from '../Footer';
import Header from '../Header';

export default class Layout extends Component {
  render() {
    return (
      <View>
        <Header />
        <View {...this.props} />
        <Footer />
      </View>
    );
  }
}
