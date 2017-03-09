import React from 'react';
import UserName from './UserName.react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="page-header clearfix">
        <button className="sign-in button">Sign in</button>
        <UserName />
      </header>
    )
  }
}
