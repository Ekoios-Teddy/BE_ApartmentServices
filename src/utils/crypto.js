const bcrypt = require("bcrypt");

const saltRound = 5;

const hashCode = (param) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRound, (err, salt) => {
      if (err) {
        return reject(err);
      }
      bcrypt.hash(param, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  });
};

const ComparePass = (param, src) => {
  console.log("param", param, src)
  return new Promise((resolve, reject) => {
    bcrypt.compare(param, src)
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
};
module.exports = { ComparePass, hashCode };
