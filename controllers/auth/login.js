const { User, joiLoginSchema } = require('../../models/user');
const { BadRequest, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TokenType = require('../../enums/TokenType');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized('Email does not exist or Password is wrong');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new Unauthorized('Email does not exist or Password is wrong');
    }

    const { _id, name } = user;
    const payload = {
      id: _id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(_id, { token });
    res.json({
      accessToken: jwt.sign({ id: _id, tokenType: TokenType.access }, SECRET_KEY, { expiresIn: '1h' }),
      refreshToken: jwt.sign({ id: _id, tokenType: TokenType.refresh }, SECRET_KEY, { expiresIn: '30d' }),
      userId: _id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
