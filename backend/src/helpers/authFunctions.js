const bcrypt = require("bcryptjs");

const authFunctions = {};

authFunctions.generateHash = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

authFunctions.validatePassword = (password, savedPassword) => {
  return bcrypt.compare(password, savedPassword);
};

module.exports = authFunctions;
