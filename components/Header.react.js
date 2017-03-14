import React from 'react';
import { withRouter } from 'react-router';
import UserName from './UserName.react';
import { checkAuthorizationData } from '../models/authorizationModel.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.signInButtonHandler = this.signInButtonHandler.bind(this);
    this.signOutButtonHandler = this.signOutButtonHandler.bind(this);
  };

  togglePopup() {
    this.popup.classList.toggle('show');
  };

  signInButtonHandler() {
    const userName = this.loginInput.value;
    const password = this.passwordInput.value;
    if (checkAuthorizationData(userName, password)) {
      this.props.changeUser(userName);
    } else {
      // error
    }
    this.togglePopup();
  };

  signOutButtonHandler() {
    if (this.context.user !== 'Guest') {
      this.props.changeUser('Guest');
      this.props.router.push('/');
    }
  };

  showSignOutButton() {
    if (this.context.user !== 'Guest') {
      return <button className="sign-in button" onClick={this.signOutButtonHandler}>Sign out</button>;
    }
  };

  render() {
    return (
      <header className="page-header clearfix">
        <div className="popup" ref={(popup) => this.popup = popup}>
          <div className="authorization-wrapper">
            <div className="close" onClick={this.togglePopup}/>
            <h2>Authorization form</h2>
            <label className="login">
              Login: <input type="text" ref={(input) => this.loginInput = input}/>
            </label>
            <label className="password">
              Password: <input type="password" ref={(input) => this.passwordInput = input}/>
            </label>
            <button className="button" onClick={this.signInButtonHandler}>Sign in</button>
          </div>
        </div>
        {this.showSignOutButton()}
        <button className="sign-in button" onClick={this.togglePopup}>Sign in</button>
        <UserName/>
      </header>
    );
  };
};

Header.contextTypes = {
  user: React.PropTypes.string
};

export default withRouter(Header);
