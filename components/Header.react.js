import React from 'react';
import { withRouter } from 'react-router';
import UserName from './UserName.react';
import { checkAuthorizationData } from '../models/authorizationModel.js';
import Modal from './Modal.react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsShown: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.signOutButtonHandler = this.signOutButtonHandler.bind(this);
    this.modalButtonHandler = this.modalButtonHandler.bind(this);
  };

  modalButtonHandler() {
    const userName = this.loginInput.value;
    const password = this.passwordInput.value;
    if (checkAuthorizationData(userName, password)) {
      this.props.changeUser(userName);
    } else {
      this.props.router.push('/error');
    };
    this.toggleModal();
  };

  signOutButtonHandler() {
    if (this.context.user !== 'Guest') {
      this.props.changeUser('Guest');
      this.setState({
        modalIsShown: false,
      });
      this.props.router.push('/');
    }
  };

  signOutButton() {
    if (this.context.user !== 'Guest') {
      return (
        <button className="sign-in button" onClick={this.signOutButtonHandler} value={this.state.author}>
          Sign out
        </button>
      );
    }
  };

  toggleModal() {
    this.setState({
      modalIsShown: !this.state.modalIsShown,
    });
  };

  createModalChildren() {
    return (
      <div>
        <label className="login">
          Login: <input type="text" ref={(input) => this.loginInput = input} />
        </label>
        <label className="password">
          Password: <input type="password" ref={(input) => this.passwordInput = input} />
        </label>
      </div>
    );
  };

  configurateModalSettings() {
    return {
      modalIsShown: this.state.modalIsShown,
      toggleModal: this.toggleModal,
      modalTitle: 'Authorization form',
      modalButtonText: 'Sign in',
      modalChildren: this.createModalChildren(),
      modalButtonHandler: this.modalButtonHandler,
    };
  };

  render() {
    return (
      <header className="page-header clearfix">
        <Modal modalSettings={this.configurateModalSettings()} />
        {this.signOutButton()}
        <button className="sign-in button" onClick={this.toggleModal}>Sign in</button>
        <UserName />
      </header>
    );
  };
};

Header.contextTypes = {
  user: React.PropTypes.string,
};

export default withRouter(Header);
