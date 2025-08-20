const { users } = require('../model/userModel');

function findUser(username) {
  return users.find(user => user.username === username);
}

function addUser(username, password) {
  if (findUser(username)) return null;
  const user = { username, password };
  users.push(user);
  return user;
}

function validateLogin(username, password) {
  const user = findUser(username);
  return user && user.password === password;
}

function listUsers() {
  return users;
}

module.exports = {
  findUser,
  addUser,
  validateLogin,
  listUsers,
};
