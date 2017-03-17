import React from 'react';

export default function(props) {
  return (
    <div>
      <h2>Authorization form</h2>
      <label className="login">
        Login: <input type="text" ref={(input) => this.loginInput = input} />
      </label>
      <label className="password">
        Password: <input type="password" ref={(input) => this.passwordInput = input} />
      </label>
      <button onClick={} className="button">
        Sign in
      </button>
    </div>
  );
};
