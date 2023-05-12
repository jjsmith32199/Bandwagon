const jwt = require('jsonwebtoken');

const secret = 'secret secret key';

const generateJWT = (payload) => {
  const expiresIn = '2h'; 
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log("Invalid token!");
    return null;
  }
};

const authMiddleware = (req, res, next) => { 
  // look for the token in the headers of the incoming request
  const token = req.headers.authorization || '';

  // if a token is found, attempt to verify it and attach the decoded token to the request object
  if (token) {
    const decoded = verifyJWT(token);
    req.user = decoded;
  }

  // proceed to the next middleware function or route handler
  next();
};

module.exports = {
  generateJWT,
  verifyJWT,
  authMiddleware,
};
