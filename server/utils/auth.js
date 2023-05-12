const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const secret = JWT_SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: function (req, res, next) {
    // look for the token in the headers of the incoming request
    let token = req.query.token || req.headers.authorization;
    console.log(token);
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    // if a token is found, attempt to verify it and attach the decoded token to the request object
    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      return res.status(400).json({ message: "invalid token!" });
    }

    // proceed to the next middleware function or route handler
    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log(username);
    const token = jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
    console.log("Signed Token: ", token);
    return token;
  },
};
