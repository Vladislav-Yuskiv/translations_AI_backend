const TokenType = require ('../../enums/TokenType');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const refresh = async (req, res, next) => {
  try {
    const token = req.body['refreshToken'];
    if (!token) {
      res.status(401).send('Access Denied. No refresh token provided.');
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    if(decoded.tokenType !== TokenType.refresh) {
      res.status(401).send('Access Denied. Invalid refresh token.');
    }
    const accessToken = jwt.sign({ id: decoded.id, tokenType: TokenType.access }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: decoded.id, tokenType: TokenType.refresh }, SECRET_KEY, { expiresIn: '30d' });

    res
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid refresh token.');
  }
};

module.exports = refresh;
