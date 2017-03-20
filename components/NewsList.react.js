import React from 'react';
import NewsItem from './NewsItem.react';
import Loading from './Loading.react';
import Modal from './Modal.react';
import Filter from './Filter.react';
import { getArticles } from '../models/articleModel.js';


export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.state = {
      sortSettings: {
        author: null,
        date: {from: null, to: Infinity,},
        tags: [],
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.modalButtonHandler = this.modalButtonHandler.bind(this);
    this.sortArticles = this.sortArticles.bind(this);
  };

  toggleModal() {
    this.setState({
      modalIsShown: !this.state.modalIsShown,
    });
  };

  sortByAuthor(article, author) {
    if (!author) {
      return true;
    }
    return article.author == author.value ? true : false;
  };

  sortByDate(article, date) {
    const articleDate = (new Date(article.date)).valueOf();
    const dateFrom = date.from;
    const dateTo = date.to ? date.to : Infinity;
    return articleDate >= dateFrom && articleDate <= dateTo;
  };

  sortByTag(article, tags) {
    if (!tags.length) {
      return true;
    }
    return article.tags.some((articleTag) => tags.includes(articleTag));
  };

  sortArticles() {
    this.sortedArticles = this.state.articles.filter(
      (article) => this.sortByDate(article, this.state.sortSettings.date) &&
      this.sortByAuthor(article, this.state.sortSettings.author) &&
      this.sortByTag(article, this.state.sortSettings.tags)
    );
  };

  modalButtonHandler(author, date, tags) {
    this.setState({
      sortSettings: {
        author: author,
        date: date,
        tags: tags,
      },
    });
    this.toggleModal();
  };

  componentDidMount() {
    getArticles().then(
      (articles) => this.setState(
        {
          loaded: true,
          articles: articles,
        }
      )
    );
  };

  render() {
    if (this.state.loaded) {
      this.sortArticles();
      return (
        <div className="news-wrapper clearfix">
          <Modal toggleModal={this.toggleModal} modalIsShown={this.state.modalIsShown}>
            <Filter buttonHandler={this.modalButtonHandler}/>
          </Modal>
          <div className="buttons-wrapper">
            <span className="button add-news" onClick={this.toggleModal}>
              Filters
            </span>
          </div>
          {this.sortedArticles.map((news, index) => <NewsItem news={news} key={index} />)}
        </div>
      );
    } else {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    };
  };
};
