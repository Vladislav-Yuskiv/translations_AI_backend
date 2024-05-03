const { TranslationKey } = require('../../models/translationKey');
const { TranslationValue } = require('../../models');
const { BadRequest } = require('http-errors');

const postTranslationKey = async (req, res, next) => {
  try {
    const {translationBundleId} = req.params;

    if(!translationBundleId){
      return new BadRequest("Invalid params")
    }

    const payload = {
      name: req.body.name,
      description: req.body.description,
      translationBundle: translationBundleId,
      updatedBy: req.body.userId,
      createdBy: req.body.userId,
    }

    const { valuesWithLanguage, currentSelectedLanguage } = req.body;

    const translationKey = await TranslationKey.create(payload);

    const translationValuesPromises = Object.entries(valuesWithLanguage).map(async ([language, value]) => {
      await TranslationValue.create({
        translation_key: translationKey._id,
        addedUser: req.body.userId,
        updatedUser: req.body.userId,
        value: value,
        language: language
      });
    });

    await Promise.all(translationValuesPromises);

    const translationValueForCurrentSelectedLanguage = await TranslationValue.findOne({
      translation_key: translationKey._id,
      language: currentSelectedLanguage
    });


    res.json({
      message: "Key was created successfully",
      translationValue: translationValueForCurrentSelectedLanguage,
      translationKey
    });
  } catch (error) {
    next(error);
  }
}
module.exports = postTranslationKey;