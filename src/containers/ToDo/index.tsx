import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {TestComponent} from './style';
import * as STORE from './../../constants/store';

@inject(STORE.TODO_STORE)
@observer
export class TodoApp extends React.Component {
  render() {
    const todoStore = this.props[STORE.TODO_STORE];

    return <TestComponent>
      Todo App ({todoStore.typeString})
      <button onClick={() => todoStore.toggleType()}>toggle type</button>
    </TestComponent>;
  }
}
