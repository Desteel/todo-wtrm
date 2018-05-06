import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {action, computed, observable} from 'mobx';
import {inject, observer, Provider} from 'mobx-react';
import {hot} from 'react-hot-loader'

class TestAppStore {
  @observable type = false;

  @computed get typeState() {
    return this.type;
  }

  @computed get typeString() {
    return '' + this.type;
  }

  @action('toggle type')
  toggleType() {
    this.type = !this.type;
  }
}

const testAppStore = new TestAppStore();

const TestComponent = styled.div`
  background-color: cornflowerblue;
  color: white;
  padding: 1rem;
  border: 1px solid black;
`;

class TestApp extends Component {
  render() {
    const {typeString, toggleType} = this.props;

    return <TestComponent>
      Test App ({typeString})
      <button onClick={toggleType}>toggle type</button>
    </TestComponent>;
  }
}

TestApp.propTypes = {
  typeString: PropTypes.string.isRequired,
  toggleType: PropTypes.func.isRequired
};

const TestAppWithStore = inject('testAppStore')(observer(({testAppStore}) => (
  <TestApp typeString={testAppStore.typeString} toggleType={() => testAppStore.toggleType()}/>
)));

const stores = {testAppStore};

const App = props => (
  <Provider {...stores}>
    <TestAppWithStore/>
  </Provider>
);

export default hot(module)(App);
