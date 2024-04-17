const jwt = require('jsonwebtoken');
const { Unauthorized, Forbidden } = require('http-errors');

const { User, Company } = require('../models');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Unauthorized('Not authorized');
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded.id);
    const user = await User.findById(decoded.id)
    console.log(user);
    if (!user) {
      throw new Unauthorized('Not authorized');
    }
    const {userId, companyId} = req.params;
    if(userId || companyId) {
      if (userId && decoded.id !== userId) {
        throw new Forbidden('Forbidden resource');
      }
      if (companyId) {
        const company = await Company.findOne(companyId)
        if(!company || company.user._id.toString() !== decoded.id) {
          throw new Forbidden('Forbidden resource');
        }
      }
    }
    
    const TokenExpired = isTokenExpired(token);

    if (TokenExpired) {
      throw new Unauthorized('Token is expired');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized (invalid access token)';
    }
    next(error);
  }
};

const isTokenExpired = token =>
  Date.now() >=
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000;

module.exports = authenticate;
