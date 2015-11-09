import React, { Component } from 'react';

import ReactJson from './json.js';

export default class App extends Component {
  render() {
    return (
        <div>
            <h1>Hello, world.</h1>
            <ReactJson data={  [ 1, 2, {fasf: 'sdfasf', lofdasf: true } ] } />
        </div>
    );
  }
}
