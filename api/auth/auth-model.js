const db = require('../../data/dbConfig.js');
const { JWT_SECRET } = require('../secrets');
const jwt = require('jsonwebtoken');

const addUser = async (user) => {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
};

const buildToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const config = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, JWT_SECRET, config);
};

module.exports = {
  addUser,
  buildToken,
};
