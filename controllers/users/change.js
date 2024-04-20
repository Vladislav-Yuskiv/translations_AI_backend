const { User, joiChangePasswordSchema } = require('../../models/user');
const { BadRequest, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');


const changePassword = async (req, res, next) => {
  try {
    const { error } = joiChangePasswordSchema.validate(req.body);

    if (error) {
      throw new BadRequest(error.message);
    }
    const { email , newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized('Email does not exist');
    }


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const payload = {
      password: hashPassword,
    };

    const { _id } = user;

    await User.findByIdAndUpdate(_id, payload);

    res.status(200).json({
      message: "Password was successfully changed"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = changePassword;
