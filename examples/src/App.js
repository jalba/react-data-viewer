import React, { Component } from 'react';

import ReactDataViewer from './React-Data-Viewer';

import ES5 from './ES5';


export default class App extends Component {
  render() {
    return (
        <div>
            <h1>React-Data-Viewer</h1>
            <ReactDataViewer data={  [ 1, 2, 'something@other.com', {fasf: 'sdfasf', lofdasf: true } ] } />
            <h2>ES5 Example</h2>
            <ES5 data={{}} />
        </div>
    );
  }
}
