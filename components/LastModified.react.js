import React from 'react';

export default class LastModified extends React.Component {
  render() {
    return (
      <span className="last-modified">
        {this.props.lastModified}
      </span>
    )
  }
}
