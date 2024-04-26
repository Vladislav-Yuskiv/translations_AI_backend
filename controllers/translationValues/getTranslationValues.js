const { TranslationValue } = require('../../models/translationValue');

const getTranslationValues = async (req, res, next) => {
  try {
    const { language } = req.query;
    const { translationsKeysIds } = req.body;

    const translationValues = await TranslationValue.find({
      translation_key: { $in: translationsKeysIds },
      language: language
    })

    res.json(translationValues);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationValues;