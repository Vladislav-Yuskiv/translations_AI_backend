const { TranslationValue } = require('../../models/translationValue');

const postTranslationValue = async (req, res, next) => {
  try {
    const {translationKeyId} = req.params;

    const payload = {
      value: req.body.value,
      language: req.body.language,
      translationKey: translationKeyId,
    }
    const translationValue = await TranslationValue.create(payload);
    res.json(translationValue);
  } catch (error) {
    next(error);
  }
}
module.exports = postTranslationValue;