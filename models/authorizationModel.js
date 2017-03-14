const authorizationData = [
  {login: '123', password: '123'},
  {login: 'admin', password: 'admin'}
];

function checkAuthorizationData(login, password) {
  return authorizationData.some(
    (item) => {
      return item.login === login &&
      item.password === password
    }
  );
};

export { checkAuthorizationData };
