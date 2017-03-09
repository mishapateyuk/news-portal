var articles = [
  {
    id: 1,
    title: 'news1',
    author: 'author',
    tags: ['sdfg', 'dsfg', 'wert', 'jhfgjh'],
    date: '10.10.2010',
    description: 'Lorem Ipsum',
    fullText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
  {
    id: 2,
    title: 'news2',
    author: 'author',
    tags: ['123', '1231234', '123', 'asdf'],
    date: '10.10.2010',
    description: 'Lorem Ipsum',
    fullText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
  {
    id: 3,
    title: 'news3',
    author: 'author',
    tags: ['adf', 'ghhdg', '123', 'ghfgmhb'],
    date: '10.10.2010',
    description: 'Lorem Ipsum',
    fullText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
  {
    id: 4,
    title: 'news4',
    author: 'author',
    tags: ['adf', 'fg', '123', 'ghfgmhb'],
    date: '10.10.2010',
    description: 'Lorem Ipsum',
    fullText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
  {
    id: 5,
    title: 'news5',
    author: 'author',
    tags: ['adf', 'ghhdg', '123', 'ghfgmhb'],
    date: '10.10.2010',
    description: 'Lorem Ipsum',
    fullText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
  {
    id: 6,
    title: 'news6',
    author: 'author',
    tags: ['adf', 'ghhdg', '123', 'ghfgmhb'],
    date: '10.10.2010',
    description: 'Lorem Ipsum',
    fullText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  },
]

function getArticles() {
  return new Promise((resolve, reject) => {
    setTimeout(()=> resolve(articles), 1500);
  });
}

function addArticle(articleDetail) {
    const article = {
      id: articleDetail.id,
      title: articleDetail.title,
      author: articleDetail.author,
      tags: articleDetail.tags,
      date: articleDetail.date,
      description: articleDetail.description,
      fullText: articleDetail.fullText
    };
    articles.push(article);
}

function getArticleById(id) {
  return new Promise(
    (resolve, reject) => {
      const article = articles.filter((item) => item.id == id);
      setTimeout(() => resolve(article[0]) ,1500);
    }
  );
}

const newId = (function getNewId() {
  let id = 6;
  return function() {
    return ++id;
  };
})();

export { getArticles, newId, getArticleById, addArticle };
