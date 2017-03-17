import React from 'react';
import Footer from './Footer.react';
import Header from './Header.react';
import { Link } from 'react-router';
import Modal from './Modal.react';

class MainPage extends React.Component {

  showButton() {
    if (this.context.user !== 'Guest') {
      return <Link to="/add" className="button add-news">Add news</Link>;
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <Header changeUser={this.props.route.changeUser} />
          <div className="buttons-wrapper">
            {this.showButton()}
            <Link to="/" className="button add-news">Show news</Link>
          </div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  };
};

MainPage.contextTypes = {
  user: React.PropTypes.string,
};

export default MainPage;
