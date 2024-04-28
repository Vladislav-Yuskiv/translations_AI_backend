const { TranslationValue, TranslationKey, TranslationBundle } = require('../../models');
const { BadRequest } = require('http-errors');

const addNewLanguage = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params;
    const {
      language,
      languageName,
      needToTranslate,
      userId
    } = req.body;

    if(!translationBundleId || !language || !userId){
      return new BadRequest("Invalid params")
    }

    //TODO Need to  add check on duplicate languages(maybe in middleware)

    const keys = await TranslationKey.find({translationBundle: translationBundleId });

    let valuesToInsert = []

    const keysInformation = keys.map(async key => {

         // Value document info
         const valueItem =  {
            translation_key: key._id,
            language,
            value: "",
            updatedUser: userId,
            addedUser: userId
          }

         valuesToInsert.push(valueItem)

         return {
            keyName: key.name,
            keyContext: key.description,
         }

    })

    console.log("valuesToInsert",valuesToInsert);

    let valuesIds = []
    if(valuesToInsert.length > 0){
      const values  = await TranslationValue.insertMany(valuesToInsert);

      valuesIds.push(values._id)
    }

    if(needToTranslate){
      // update key value using AI
      console.log('keysInformation',keysInformation);
    }

    await TranslationBundle.findByIdAndUpdate(
      translationBundleId,
      { $addToSet: { translatedLanguages: language } },
      )

    res.json({
      message:`${languageName} was successfully added`,
      info: {
        language
      }
    });

  } catch (error) {
    console.log('error',error);
    next(error);
  }
}
module.exports = addNewLanguage;