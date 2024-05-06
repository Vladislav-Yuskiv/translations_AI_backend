const { TranslationKey } = require('../../models/translationKey');
const { TranslationValue } = require('../../models');
const { BadRequest,Conflict } = require('http-errors');

const uploadTranslationKeys = async (req, res, next) => {
  try {
    const {translationBundleId} = req.params;


    const { keys, languages, needTranslate , userId ,currentSelectedLanguage} = req.body;

    if(!translationBundleId || !keys || !userId || !currentSelectedLanguage){
      throw new BadRequest("Invalid params")
    }

    const existingKeys = await TranslationKey.find({ name: { $in: keys.map(key => key.key)  } ,translationBundle: translationBundleId});

    if (existingKeys.length > 0) {
      throw  new Conflict("Keys need to be unique in one bundle");
    }


    const keysToUpload = keys.map(uploadKey => {
          return{
            name: uploadKey.key.trim(),
            description: uploadKey.context.trim(),
            updatedBy: userId,
            createdBy: userId,
            translationBundle: translationBundleId
          }
    })

    const createdKeys =  await TranslationKey.insertMany(keysToUpload);

    const valuesToUpload = createdKeys.flatMap(createdKey =>
      languages.map(language => ({
        language,
        translation_key: createdKey._id,
        updatedUser: userId,
        addedUser: userId,
        value: ''
      }))
    );

    console.log('valuesToUpload',valuesToUpload);

    const createdValues = await TranslationValue.insertMany(valuesToUpload);

    const filteredValues = createdValues.filter(value => value.language === currentSelectedLanguage);

    res.json({
      message: "Keys was uploaded successfully",
      keys: createdKeys,
      values: filteredValues
    });

  } catch (error) {
    next(error);
  }
}
module.exports = uploadTranslationKeys;