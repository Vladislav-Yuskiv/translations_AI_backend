const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const { TranslationKey, TranslationValue } = require('../../models');
const checkBundleTranslation = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params;
    const { language } = req.query;

    if(!translationBundleId || !language){
      return new BadRequest("Invalid request")
    }

    const keys = await TranslationKey.find({translationBundle: translationBundleId })
    const totalKeys = keys.length
    const keysIds = keys.map(key => key._id)
    const totalValues = await TranslationValue.countDocuments({
      translation_key: { $in: keysIds },
      language: language,
      value: { $ne: "" }
    })

    const isEqual = totalKeys === totalValues

    res.status(200).json({
      showAlert:!isEqual
    });

  } catch (error) {
    next(error);
  }
}
module.exports = checkBundleTranslation;