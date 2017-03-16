import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class CustomSelect extends React.Component {
  render() {
    return <Select {...this.props}  />
  };
}