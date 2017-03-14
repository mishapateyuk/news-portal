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
      user: 'Guest',
    };
    this.changeUser = this.changeUser.bind(this);
  };

  changeUser(user) {
    this.setState({
      user
    });
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
          <Route path='/add' component={NewsEdit} />
          <Route path='/edit/:id' component={NewsEdit} />
          <Route path='/remove/:id' component={RemoveNews} />
          <Route path='/error' component={ErrorPage} />
        </Route>
      </Router>
    );
  };
};

App.childContextTypes = {
  user: React.PropTypes.string
};

export default App;