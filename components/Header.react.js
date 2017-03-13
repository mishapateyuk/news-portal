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
    this.userName = this.loginInput.value;
    const password = this.passwordInput.value;
    if (checkAuthorizationData(this.userName, password)) {
      this.props.changeUser(this.userName);
    } else {
      // error
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
        <UserName getUser={this.props.getUser}/>
      </header>
    )
  }
}
