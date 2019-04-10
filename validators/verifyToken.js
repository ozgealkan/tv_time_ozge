const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const config = require('../config');
const Errors = require('../errors/UserErrors');
const { User } = require('../database/models/user.js');

const verifyToken = (req, res, next) => {
  const token = req.headers['Authorization'];
  if (req.path !== '/user/login' && req.path !== '/user/signUp') {
    if (!token) {
      throw new Errors.UserCreateException();
    }
    jwt.verify(token, config.auth.secretKey, (err, decoded) => {
      if (err) {
        throw new Errors.InvalidPassword();
      }
      const userId = decoded.id;
      User.findOne({ where: { id: userId } })
        .then((user) => {
          if (!user) {
            throw new Errors.InvalidPassword();
          }
          //req["currentUser"]=user;
        });
      next();
    });
  } else {
    next();
  }

};
verifyToken.unless = unless;

module.exports = verifyToken;
