import React from 'react';
import Wrapper from './Wrapper.react';
import Footer from './Footer.react';
import Header from './Header.react';
import { Link } from 'react-router';


class MainPage extends React.Component {

  showButton() {
    if (this.context.user !== 'Guest') {
      return <Link to="/add" className="button add-news">Add news</Link>
    }
  }

  render() {
    return (
      <div>
        <Wrapper className="wrapper" >
          <Header changeUser={this.props.route.changeUser}/>
          <div className="buttons-wrapper">
            {this.showButton()}
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

MainPage.contextTypes = {
  user: React.PropTypes.string
}

export default MainPage;
