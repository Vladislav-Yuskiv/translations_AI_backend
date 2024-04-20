const { TranslationKey } = require('../../models/translationKey');

const getTranslationKeys = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params
    const translationKeys = await TranslationKey.find({ translationBundle: translationBundleId });
    res.json(translationKeys);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationKeys;