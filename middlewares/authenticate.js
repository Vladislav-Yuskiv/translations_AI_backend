const jwt = require('jsonwebtoken');
const { Unauthorized, Forbidden ,NotFound} = require('http-errors');

const { User, TranslationBundle } = require('../models');
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
    if (!user) {
      throw new NotFound('User not found');
    }
    const {userId, translationBundleId , deleteUserInBundle = false} = req.params;
    console.log(req.params);
    if(userId || translationBundleId) {
      if (userId && decoded.id !== userId && !deleteUserInBundle) {
        throw new Forbidden('Forbidden resource');
      }
      if (translationBundleId) {
        const translationBundle = await TranslationBundle.findById(translationBundleId)
        if(!translationBundle || !translationBundle.users.includes(decoded.id)) {
          throw new Forbidden('Forbidden resource');
        }
      }
    }
    
    const TokenExpired = isTokenExpired(token);

    if (TokenExpired) {
      throw new Unauthorized('Token is expired');
    }
    console.log("Middleware good");
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
