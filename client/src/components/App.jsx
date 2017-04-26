import React, { Component } from 'react';

import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

export default class App extends Component {
  render () {
    return (
      <section className="container">
        <NavigationBar />
        <FlashMessagesList />
        { this.props.children }
      </section>
    );
  }
}