const { User, joiRegisterSchema } = require('../../models/user');
const { BadRequest, Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TokenType = require('../../enums/TokenType');
const { TranslationBundle } = require('../../models');
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password, translationBundleId = null } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

     const newUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

     if(translationBundleId){
       //I suppose it is a reference user
       await TranslationBundle.findByIdAndUpdate(
         translationBundleId,
         { $addToSet: { users: newUser._id } },
         { new: true }
       );

     }else{
       //create a default bundle
      const test =  await TranslationBundle.create({
         name: "Translation Bundle 1",
         description: "Your bundle description",
         users: [newUser._id]
       })

       console.log("test",test);
     }

    res.status(201).json({
      accessToken: jwt.sign({ id: newUser._id, tokenType: TokenType.access }, SECRET_KEY, { expiresIn: '1h' }),
      refreshToken: jwt.sign({ id: newUser._id, tokenType: TokenType.refresh }, SECRET_KEY, { expiresIn: '30d' }),
      id: newUser._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
