const { User } = require('../../models/user');
const { Conflict } = require('http-errors');

const updateUser = async (req, res, next) => {
  try {

    const { userId } = req.params;

    const { payload } = req.body;

    let needToCheckUserEmail = true

    if(req.user.email === payload.email){
       needToCheckUserEmail = false
    }

    if(needToCheckUserEmail){
      const checkUser = await User.findOne({ email: payload.email });

      if(checkUser && (req.user.email !== payload.email)){
        throw new Conflict('Email in use');
      }

    }

    const user = await User.findByIdAndUpdate(userId, { ...payload }, { new: true });
    res.status(200).json({
      message: "Successfully updated",
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
