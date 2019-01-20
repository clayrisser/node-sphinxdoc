import React, { Component } from 'react';
import Layout from '~/containers/Layout';

export default class NotFound extends Component {
  render() {
    return (
      <Layout>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    );
  }
}
