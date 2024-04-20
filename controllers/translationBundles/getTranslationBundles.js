const { TranslationBundle } = require('../../models/translationBundle');

const getTranslationBundles = async (req, res, next) => {
  try {
    const user = req.user
    const translationBundles = await TranslationBundle.find({ users: { $in: [user._id] } });
    res.json(translationBundles);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationBundles;