const userService = require('../service/userService');

function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  const user = userService.addUser(username, password);
  if (!user) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  res.status(201).json({ message: 'User registered successfully.' });
}

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  const valid = userService.validateLogin(username, password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  res.status(200).json({ message: 'Login successful.' });
}

function listUsers(req, res) {
  const users = userService.listUsers();
  res.status(200).json(users);
}

module.exports = {
  register,
  login,
  listUsers,
};
