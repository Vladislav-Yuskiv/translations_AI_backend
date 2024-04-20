const { TranslationBundle } = require('../../models/translationBundle');

const getTranslationBundleId = async (req, res, next) => {
  const { translationBundleId } = req.params;
  try {
    const translationBundle = await TranslationBundle.findById(translationBundleId);
    if(!translationBundle) {
      res.status(404).send('Translation Bundle not found');
    }
    res.json(translationBundle);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationBundleId;