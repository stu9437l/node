const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const hasedPassword = bcrypt.hash(password, 12);
  return hasedPassword;
};
const checkPassword = (prevPassword, password) => {
  const comparepassword = bcrypt.compare(prevPassword, password);
  return comparepassword;
};
const BcryptService = {
  hashPassword,
  checkPassword,
};
module.exports = BcryptService;
