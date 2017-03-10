import React from 'react';
import UserName from './UserName.react';
import { checkAuthorizationData } from '../models/authorizationModel.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopup = this.togglePopup.bind(this);
    this.signInButtonHandler = this.signInButtonHandler.bind(this);
  }

  togglePopup() {
    this.popup.classList.toggle('show');
  }

  signInButtonHandler() {
    const userName = this.loginInput.value;
    const password = this.passwordInput.value;
    if (checkAuthorizationData(userName, password)) {
      this.props.changeUser(userName);
    } else {
      // error page will be here
    }
    this.togglePopup();
  }

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
        <button className="sign-in button" onClick={this.togglePopup}>Sign in</button>
        <UserName userName={this.props.state.user}/>
      </header>
    )
  }
}
