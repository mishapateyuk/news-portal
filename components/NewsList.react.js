import React from 'react';
import NewsItem from './NewsItem.react';
import Loading from './Loading.react';
import Modal from './Modal.react';
import Select from './Select.react';
import { getArticles } from '../models/articleModel.js';
import { getUsers } from '../models/authorizationModel.js';
import { getTags } from '../models/tagsModel.js';
import Calendar from 'rc-calendar'; //http://react-component.github.io/calendar/
import 'rc-calendar/assets/index.css';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.state = {
      sortSettings: {
        author: null,
        data: null,
        tags: [],
      },
      tags: [],
      modalIsShown: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.modalButtonHandler = this.modalButtonHandler.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
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
    return article.author == author ? true : false;
  };

  sortByDate(article, date) {
    if (!date) {
      return true;
    }
    return article.date.indexOf(date) !== -1 ? true : false;
  };

  sortByTag(article, tags) {
    if (!tags.length) {
      return true;
    }
    return article.tags.some((articleTag) => tags.includes(articleTag));
  };

  sortArticles() {
    this.sortedArticles = this.state.articles.filter((article) => {
      return this.sortByDate(article, this.state.sortSettings.date) &&
        this.sortByAuthor(article, this.state.sortSettings.author) &&
        this.sortByTag(article, this.state.sortSettings.tags)
    });
  };

  createModalChildren() {
    const authorsOptions = getUsers().map((user) => {
      return {value: user, label:user};
    });
    const tagsOptions = getTags().map((tag) => {
      return {value: tag, label:tag};
    });
    return (
      <div>
        Author:
        <Select
          options={authorsOptions}
          className="modal-select"
          onChange={this.onChangeAuthor}
          value={this.state.author}
        />
        Date:
        <Calendar className="modal-select"/>
        Tag:
        <Select
          options={tagsOptions}
          multi
          className="modal-select"
          onChange={this.onChangeTags}
          value={this.state.tags}
        />
      </div>
    );
  };

  onChangeAuthor(value) {
    this.setState({
      author: value,
    });
  };

  onChangeTags(value) {
    this.setState({
      tags: value,
    });
  };

  modalButtonHandler() {
    this.setState({
      sortSettings: {
        author: this.state.author.value,
        data: this.state.data,
        tags: this.state.tags.map((tag) => tag.value) || [],
      },
    });
    this.toggleModal();
  };

  configurateModalSettings() {
    return {
      modalIsShown: this.state.modalIsShown,
      toggleModal: this.toggleModal,
      modalTitle: 'News filters',
      modalButtonText: 'Show sorted news',
      modalChildren: this.createModalChildren(),
      modalButtonHandler: this.modalButtonHandler,
    };
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
          <Modal modalSettings={this.configurateModalSettings()} />
          <div className="buttons-wrapper">
            <span className="button add-news" onClick={this.toggleModal}>
              Filters
            </span>
          </div>
          {this.sortedArticles.map((news) => <NewsItem news={news} key={news.id} />)}
        </div>
      );
    } else {
      return (
        <div className="news-wrapper clearfix">
          <Loading />
        </div>
      );
    }
  };
};
