import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import MainPage from './MainPage.react';
import NewsDetail from './NewsDetail.react';
import NewsEdit from './NewsEdit.react';
import ErrorPage from './ErrorPage.react';
import NewsList from './NewsList.react';
import RemoveNews from './RemoveNews.react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: localStorage.getItem('username') || 'Guest',
    };
    this.changeUser = this.changeUser.bind(this);
    this.requireAuth = this.requireAuth.bind(this);
  };

  changeUser(user) {
    localStorage.setItem('username', user);
    this.setState({
      user,
    });
  };

  requireAuth(nextState, replace) {
    if (this.state.user === 'Guest') {
        replace({
        pathname: '/error',
      })
    }
  };

  getChildContext() {
    return {user: this.state.user};
  };

  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={MainPage} changeUser={this.changeUser}>
          <IndexRoute component={NewsList} />
          <Route path='/detail/:id' component={NewsDetail} />
          <Route path='/add' component={NewsEdit} onEnter={this.requireAuth} />
          <Route path='/edit/:id' component={NewsEdit} onEnter={this.requireAuth} />
          <Route path='/remove/:id' component={RemoveNews} onEnter={this.requireAuth} />
          <Route path='/error' component={ErrorPage} />
        </Route>
      </Router>
    );
  };
};

App.childContextTypes = {
  user: React.PropTypes.string,
};

export default App;