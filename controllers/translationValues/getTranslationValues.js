const { translationValue } = require('../../models/translationValue');

const getTranslationValues = async (req, res, next) => {
  try {
    const { translationKeyId } = req.params
    const translationValues = await translationValue.find({ translationKey: translationKeyId });
    res.json(translationValues);
  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationValues;