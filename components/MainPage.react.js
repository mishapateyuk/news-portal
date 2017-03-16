import React from 'react';
import Footer from './Footer.react';
import Header from './Header.react';
import { Link } from 'react-router';

class MainPage extends React.Component {
  constructor() {
    super();
    this.togglePopup = this.togglePopup.bind(this);
    this.changeSortSettings = this.changeSortSettings.bind(this);
    this.showSortedNews = this.showSortedNews.bind(this);
    this.state = {
      sortSettings: {
        author: null,
        data: null,
        tags: [],
      }
    };
  };

  showButton() {
    if (this.context.user !== 'Guest') {
      return <Link to="/add" className="button add-news">Add news</Link>;
    }
  };

  changeSortSettings(sortSettings) {
    this.setState({
      sortSettings
    });
  };

  showSortedNews() {
    const sortSettings = {
      author: this.author.value,
      data: this.date.value,
      tags: this.tags.value,
    };
    this.changeSortSettings(sortSettings);
    this.togglePopup();
  };

  togglePopup() {
    this.popup.classList.toggle('show');
  };

  getChildContext() {
    return {sortSettings: this.state.sortSettings};
  };

  render() {
    return (
      <div>
        <div className="popup" ref={(popup) => this.popup = popup}>
          <div className="authorization-wrapper">
            <div className="close" onClick={this.togglePopup}/>
            <h2>Sort by:</h2>
            <label className="login">
              Author:
              <input type="text" ref={(author) => this.author = author}/>
            </label>
            <label className="login">
              Date:
              <input type="text" ref={(date) => this.date = date}/>
            </label>
            <label className="login">
              Tag:
              <input type="text" ref={(tags) => this.tags = tags}/>
            </label>
            <button onClick={this.showSortedNews} className="button">
              Show sorted news
            </button>
          </div>
        </div>
        <div className="wrapper">
          <Header changeUser={this.props.route.changeUser}/>
          <div className="buttons-wrapper">
            {this.showButton()}
            <Link to="/" className="button add-news">Show news</Link>
            <span className="button add-news" onClick={this.togglePopup}>
              Filters
            </span>
          </div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  };
};

MainPage.contextTypes = {
  user: React.PropTypes.string
};

MainPage.childContextTypes = {
  sortSettings: React.PropTypes.object
};

export default MainPage;
