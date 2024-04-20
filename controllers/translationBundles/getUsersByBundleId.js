const { TranslationBundle } = require('../../models/translationBundle');
const { User } = require('../../models');

const getUsersByBundleId = async (req, res, next) => {
  const { translationBundleId } = req.params;
  try {
    const translationBundle = await TranslationBundle.findById(translationBundleId);

    if(!translationBundle) {
      res.status(404).send('Translation Bundle not found');
    }
    const users = await User.find({ _id: { $in: translationBundle.users } });

    console.log(users);
    res.json({ users });
  } catch (error) {
    next(error);
  }
}
module.exports = getUsersByBundleId;