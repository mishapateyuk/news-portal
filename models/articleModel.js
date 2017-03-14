var articles = [];

function getArticles() {
  return new Promise((resolve, reject) => {
    setTimeout(()=> resolve(articles), 1500);
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
      fullText: articleDetail.fullText
    };
    articles.push(article);
};

function getArticleById(id) {
  return new Promise(
    (resolve, reject) => {
      const article = articles.find((item) => item.id == id);
      setTimeout(() => resolve(article) ,1500);
    }
  );
};

function editArticle(id, editedArticle) {
  let article = articles.find((item) => item.id == id);
  article = Object.assign(article, editedArticle);
};

function deleteArticle(id) {
  const article = articles.find((item) => item.id == id);
  const index = articles.indexOf(article);
  articles.splice(index, 1);
}

const newId = (function getNewId() {
  let id = 0;
  return function() {
    return ++id;
  };
})();

export { getArticles, newId, getArticleById, addArticle, editArticle, deleteArticle };
