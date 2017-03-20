import React from 'react';

export default class Auth extends React.Component {
  render() {
    return (
      <div>
        <h2>Authorization form</h2>
        <label className="login">
          Login: <input type="text" ref={(input) => this.loginInput = input} />
        </label>
        <label className="password">
          Password: <input type="password" ref={(input) => this.passwordInput = input} />
        </label>
        <button
          onClick={
            () => this.props.buttonHandler(
              this.loginInput && this.loginInput.value,
              this.passwordInput && this.passwordInput.value
            )
          }
          className="button"
        >
          Sign in
        </button>
      </div>
    );
  };
};
