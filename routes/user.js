const express = require('express');
const crypto = require('crypto-js');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const Errors = require('../errors/UserErrors');
const config = require('../config');

const Op = Sequelize.Op;

const router = express.Router();


const { User } = require('../connection');
const { Token } = require('../connection');

router.post('/signUp', (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(3)),
    type: req.body.type,
  };
  User.create(data)
    .then((user) => {
      if (!user) {
        throw new Errors.UserCreateException();
      }
      const token = jwt.sign({ id: user.id }, config.auth.secretKey, { expiresIn: config.auth.tokenExpiresIn });
      const datas = {
        token: token,
        userId: user.id,
      };
      return datas;
    })
    .then((datass) => {
      return Token.create(datass);
    })
    .then((tokens) => {
      if (!tokens) {
        throw new Errors.UserCreateException();
      }
      res.send({ data: tokens });
    });
});

router.post('/login', (req, res) => {
  let users = {};
  const data = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  };
  User.findOne({
    where: {
      [Op.or]: [{ email: data.username }, { username: data.username }],
      username: data.username,
      type: data.type,
    },
  })
    .then((user) => {
      users.user = user;
      if (user) {
        return bcrypt.compare(data.password, user.password);
      }
      throw new Errors.UserNotFound();
    })
    .then((bcryptResult) => {
      if (bcryptResult) {
        const token = jwt.sign({ id: users.user.id }, config.auth.secretKey, { expiresIn: config.auth.tokenExpiresIn });
        const datas = {
          token,
          userId: users.user.id,
        };
        return Token.create(datas);
      }
      throw new Errors.InvalidPassword();
    })
    .then((result) => {
      if (!result) {
        throw new Errors.UserCreateException();
      }
      res.send({ token: result.token, user: users.user });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put('/profile', (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(3)),
  };
  User.update(data)
    .then((updatedData) => {
      if (!updatedData.affectedRowCount) {
        throw new Errors.UserCreateException();
      }
      res.send({ data: updatedData });
    });
});

module.exports = router;
