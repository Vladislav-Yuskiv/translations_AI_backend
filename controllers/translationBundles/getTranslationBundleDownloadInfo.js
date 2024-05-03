const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const { TranslationKey, TranslationValue } = require('../../models');
const getTranslationBundleDownloadInfo = async (req, res, next) => {
  try {
    console.log("in getTranslationBundleDownloadInfo");

    const { translationBundleId } = req.params;
    const { language } = req.query;

    if(!translationBundleId || !language){
      return new BadRequest("Invalid request")
    }

    const keys = await TranslationKey.find({translationBundle: translationBundleId })
    const keysMap = new Map(keys.map(key => [key._id.toString(), key]));


    const values = await TranslationValue.find({
      translation_key: { $in: keys.map(key => key._id) },
      language: language,
    })

    const data = values.map(value => ({
      keyName: keysMap.get(value.translation_key.toString()).name,
      keyDescription: keysMap.get(value.translation_key.toString()).description,
      keyValue: value.value
    }));

    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
}
module.exports = getTranslationBundleDownloadInfo;