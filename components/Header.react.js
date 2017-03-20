import React from 'react';
import { withRouter } from 'react-router';
import UserName from './UserName.react';
import { checkAuthorizationData } from '../models/authorizationModel.js';
import Modal from './Modal.react';
import Auth from './Auth.react';

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

  modalButtonHandler(login, password) {
    if (checkAuthorizationData(login, password)) {
      this.props.changeUser(login);
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

  render() {
    return (
      <header className="page-header clearfix">
        <Modal toggleModal={this.toggleModal} modalIsShown={this.state.modalIsShown}>
          <Auth buttonHandler={this.modalButtonHandler}/>
        </Modal>
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
