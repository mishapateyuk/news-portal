import React from 'react';
import NewsItem from './NewsItem.react';
import Loading from './Loading.react';
import Modal from './Modal.react';
import Select from './Select.react';
import FromToDatepicker from './FromToDatepicker.react';
import { getArticles } from '../models/articleModel.js';
import { getUsers } from '../models/authorizationModel.js';
import { getTags } from '../models/tagsModel.js';

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
      tags: [],
      fromDate: null,
      toDate: Infinity,
      modalIsShown: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.modalButtonHandler = this.modalButtonHandler.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.onChangeDateFrom = this.onChangeDateFrom.bind(this);
    this.onChangeDateTo = this.onChangeDateTo.bind(this);
  };

  toggleModal() {
    this.setState({
      modalIsShown: !this.state.modalIsShown,
    });
  };

  onChangeDateFrom(moment) {
    const fromDate = moment ? new Date(moment._d.toLocaleDateString()).valueOf() : 0;
    this.setState({
      fromDate: fromDate,
    });
  };

  onChangeDateTo(moment) {
    const toDate = moment ? new Date(moment._d.toLocaleDateString()).valueOf() + 3 * 3600000: Infinity;
    this.setState({
      toDate: toDate,
    });
  };

  sortByAuthor(article, author) {
    if (!author) {
      return true;
    }
    return article.author == author ? true : false;
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
        <div className="modal-select">
          <FromToDatepicker onChangeDateTo={this.onChangeDateTo} onChangeDateFrom={this.onChangeDateFrom}/>
        </div>
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
        author: this.state.author && this.state.author.value,
        date: {from: this.state.fromDate, to: this.state.toDate,},
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
