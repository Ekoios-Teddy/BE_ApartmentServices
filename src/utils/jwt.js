const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const { APP_SECRET } = require('../constants');

function signToken(user) {
  return jwt.sign({ user }, APP_SECRET);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, APP_SECRET, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded.user);
    });
  });
}

module.exports = {
  signToken,
  verifyToken,
};
