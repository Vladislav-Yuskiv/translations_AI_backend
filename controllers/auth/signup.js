const { User, joiRegisterSchema } = require('../../models/user');
const { BadRequest, Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const TokenType = require('../../enums/TokenType');
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const id = nanoid(16);
    const payload = {
      id,
    };
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      accessToken: jwt.sign({ id: id, tokenType: TokenType.access }, SECRET_KEY, { expiresIn: '1h' }),
      refreshToken: jwt.sign({ id: id, tokenType: TokenType.refresh }, SECRET_KEY, { expiresIn: '30d' }),
      id: id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
