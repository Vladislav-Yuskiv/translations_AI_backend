const { User } = require('../../models/user');

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if(!user) {
      res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}
module.exports = getUserById;