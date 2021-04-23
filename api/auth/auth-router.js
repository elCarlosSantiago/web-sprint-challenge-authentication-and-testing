const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./auth-model');
const registerPayload = require('../middleware/registerPayload');
const loginPayload = require('../middleware/loginPayload');
const checkUsernameExists = require('../middleware/checkUsernameExists');
const loginValidation = require('../middleware/loginValidation');

router.post('/register', registerPayload, async (req, res, next) => {
  try {
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    const newUser = await Users.addUser(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post('/login', loginPayload, checkUsernameExists, loginValidation, (req, res) => {
  const { user, token } = req;
  res.json({ message: `welcome, ${user.username}`, token });
});

module.exports = router;
