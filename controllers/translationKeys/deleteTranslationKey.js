const { TranslationKey } = require('../../models/translationKey');
const { TranslationValue } = require('../../models');
const { BadRequest } = require('http-errors');
const deleteTranslationKey = async (req, res, next) => {
  try {
    const { translationKeyId,translationBundleId } = req.params

    if(!translationKeyId || !translationBundleId){
      return new BadRequest("Invalid params")
    }

    await TranslationKey.deleteOne({_id: translationKeyId,translationBundle: translationBundleId});

    await TranslationValue.deleteMany({translation_key: translationKeyId})

    res.status(200).json({
      message: `Key was successfully deleted`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
module.exports = deleteTranslationKey;