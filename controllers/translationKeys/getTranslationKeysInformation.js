const { TranslationKey } = require('../../models/translationKey');

const getTranslationKeysInformation = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params
    const count = await TranslationKey.countDocuments({ translationBundle: translationBundleId });
    res.json({
      totalCount: count
    });
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationKeysInformation;