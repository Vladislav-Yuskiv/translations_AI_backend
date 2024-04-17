const { TranslationKey } = require('../../models/translationKey');

const getTranslationKeys = async (req, res, next) => {
  try {
    const { companyId } = req.params
    const translationKeys = await TranslationKey.find({ company: companyId });
    res.json(translationKeys);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationKeys;