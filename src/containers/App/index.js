import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Route, Router, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {TodoApp} from './../ToDo';
import {NotFound} from "../NotFound";

class RootApp extends Component {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools/>;
    }
  }

  render() {
    const {history} = this.props;

    return <Router history={history}>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Todo</Link></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={TodoApp}/>
          <Route component={NotFound}/>
        </Switch>
        {this.renderDevTool()}
      </div>
    </Router>;
  }
}

export const App = hot(module)(props => <RootApp {...props}/>);
