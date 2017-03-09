import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import MainPage from './MainPage.react';
import NewsDetail from './NewsDetail.react';
import NewsEdit from './NewsEdit.react';
import ErrorPage from './ErrorPage.react';
import NewsList from './NewsList.react';

export default class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={MainPage} >
          <IndexRoute component={NewsList}/>
          <Route path='/detail/:id' component={NewsDetail} />
          <Route path='/add' component={NewsEdit} />
          <Route path='/error' component={ErrorPage} />
        </Route>
      </Router>
    )
  }
}
