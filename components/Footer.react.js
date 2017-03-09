import React from 'react';
import LastModified from './LastModified.react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
          <p>
            News Portal
          </p>
          <LastModified />
          <p>
            designed by: <a href="https://github.com/mishapateyuk">Misha</a>
          </p>
      </footer>
    )
  }
}
