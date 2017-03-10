import React from 'react';
import Wrapper from './Wrapper.react';
import Footer from './Footer.react';
import Header from './Header.react';
import { Link } from 'react-router';


export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Wrapper className="wrapper" >
          <Header changeUser={this.props.route.changeUser} state={this.props.route.state}/>
          <div className="buttons-wrapper">
            <Link to="/add" className="button add-news">Add news</Link>
            <Link to="/" className="button add-news">Show news</Link>
            <span className="button add-news">Filters</span>
          </div>
          {this.props.children}
        </Wrapper>
        <Footer />
      </div>
    )
  }
}
