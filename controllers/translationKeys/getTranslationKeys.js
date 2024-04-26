const { TranslationKey } = require('../../models/translationKey');

const getTranslationKeys = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;

    const startIndex = (page - 1) * limit;

    const translationKeys = await TranslationKey.find({ translationBundle: translationBundleId })
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(startIndex);

    res.json(translationKeys);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationKeys;