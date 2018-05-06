import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './containers/App';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import {createBrowserHistory} from 'history';
import {RouterStore} from './stores/router';
import {ToDoStore} from './stores/todo';
import * as STORE from './constants/store';

configure({enforceActions: true});

const history = createBrowserHistory();

const stores = {
  [STORE.ROUTE_STORE]: new RouterStore(history),
  [STORE.TODO_STORE]: new ToDoStore()
};

ReactDOM.render(
  <Provider {...stores}>
    <App history={history}/>
  </Provider>, document.getElementById('app')
);
