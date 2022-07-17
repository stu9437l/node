const jwt = require("jsonwebtoken");

const TokenGenerate = (id, expireTime) => {
  const token = jwt.sign({ id: id }, "JSON_SECRETE_KEY", {
    expiresIn: "2d" || expireTime,
  });
  return token;
};

const TokenVerify = (token) => {
  const verifyToken = jwt.verify(token, "JSON_SECRETE_KEY");
  return verifyToken;
};

const JwtServices = {
  TokenGenerate,
  TokenVerify,
};
module.exports = JwtServices;
