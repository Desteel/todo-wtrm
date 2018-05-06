import React, {Component} from 'react';
import {render} from 'react-dom';

class TestApp extends Component {
  render() {
    return <div>Test App</div>;
  }
}

render(<TestApp/>, document.getElementById('app'));
