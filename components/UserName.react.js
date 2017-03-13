import React from 'react';

export default class UserName extends React.Component {
  render() {
    return (
      <span className="user-name">
        <b>Signed in as:</b> {this.props.getUser()}
      </span>
    )
  }
}
