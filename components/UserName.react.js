import React from 'react';

class UserName extends React.Component {
  render() {
    return (
      <span className="user-name">
        <b>Signed in as:</b> {this.context.user}
      </span>
    );
  };
};

UserName.contextTypes = {
  user: React.PropTypes.string
};

export default UserName;
