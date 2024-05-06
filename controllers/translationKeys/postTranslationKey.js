const { TranslationKey } = require('../../models/translationKey');
const { TranslationValue } = require('../../models');
const { BadRequest, Conflict } = require('http-errors');

const postTranslationKey = async (req, res, next) => {
  try {
    const {translationBundleId} = req.params;

    if(!translationBundleId){
      throw new BadRequest("Invalid params")
    }

    const existingKey = await TranslationKey.findOne({ name:req.body.name, translationBundle: translationBundleId });

    if(existingKey){
      throw  new Conflict("Keys need to be unique in one bundle");
    }

    const payload = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
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