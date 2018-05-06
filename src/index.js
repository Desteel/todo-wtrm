import React, {Component} from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';

const TestComponent = styled.div`
  background-color: cornflowerblue;
  color: white;
  padding: 1rem;
  border: 1px solid black;
`;

class TestApp extends Component {
  render() {
    return <TestComponent>Test App</TestComponent>;
  }
}

render(<TestApp/>, document.getElementById('app'));
