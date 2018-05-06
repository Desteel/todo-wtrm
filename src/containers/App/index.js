import React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Router, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {TodoApp} from './../ToDo';
import {NotFound} from "../NotFound";

export const App = hot(module)(({history}) => (
  <Router history={history}>
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
    </div>
  </Router>
));
