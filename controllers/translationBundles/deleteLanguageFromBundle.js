const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const { TranslationKey, TranslationValue } = require('../../models');

const deleteLanguageFromBundle = async (req, res, next) => {
  try {
    const { language,translationBundleId } = req.params

    if(!language || !translationBundleId){
      return new BadRequest("Invalid params")
    }

    const keys = await TranslationKey.find({translationBundle: translationBundleId })
    const keysIds = keys.map(key => key._id)

    await TranslationValue.deleteMany({ translation_key: { $in: keysIds }, language });

    await TranslationBundle.findByIdAndUpdate(
      translationBundleId,
      { $pull: { translatedLanguages: language } },
      { new: true }
    )

    res.status(200).json({
      message: `Language was successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = deleteLanguageFromBundle;