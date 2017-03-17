var articles = JSON.parse(localStorage.getItem('news')) || [];

function getArticles() {
  return new Promise((resolve, reject) => {
    setTimeout(()=> resolve(articles.reverse()), 1000);
  });
};

function addArticle(articleDetail) {
  const article = {
    id: articleDetail.id,
    title: articleDetail.title,
    author: articleDetail.author,
    tags: articleDetail.tags,
    date: articleDetail.date,
    description: articleDetail.description,
    fullText: articleDetail.fullText,
  };
  articles.push(article);
  localStorage.setItem(
    'news',
    JSON.stringify(articles)
  );
};

function getArticleById(id) {
  return new Promise(
    (resolve, reject) => {
      const article = articles.find((item) => item.id == id);
      setTimeout(() => resolve(article) ,1000);
    }
  );
};

function editArticle(id, editedArticle) {
  let article = articles.find((item) => item.id == id);
  article = Object.assign(article, editedArticle);
  localStorage.setItem(
    'news',
    JSON.stringify(articles)
  );
};

function deleteArticle(id) {
  const article = articles.find((item) => item.id == id);
  const index = articles.indexOf(article);
  articles.splice(index, 1);
  localStorage.setItem(
    'news',
    JSON.stringify(articles)
  );
}

const newId = (function getNewId() {
  let id = localStorage.getItem('lastID') || 0;
  return function() {
    id++;
    localStorage.setItem('lastID', id);
    return id;
  };
})();

export { getArticles, newId, getArticleById, addArticle, editArticle, deleteArticle };
