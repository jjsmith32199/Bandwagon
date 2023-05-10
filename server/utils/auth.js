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
    return res.status(400).json({ message: "invalid token!" });
  }
};

module.exports = {
  generateJWT,
  verifyJWT
};
