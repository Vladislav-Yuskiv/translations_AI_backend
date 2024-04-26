const { TranslationKey, TranslationValue } = require('../models');

async function createDefaultKeysAndValues(bundleId, userId){
  const defaultKeys = [
    {
      name: "Key example 1" ,
      description: 'Key description 1',
      translationBundle: bundleId,
      createdBy: userId
    },
    {
      name: "Key example 2" ,
      description: 'Key description2',
      translationBundle: bundleId,
      createdBy: userId
    },
    {
      name: "Key example 3" ,
      description: 'Key description 3',
      translationBundle: bundleId,
      createdBy: userId
    },
  ];

  const createdDefaultKeys =  await TranslationKey.insertMany(defaultKeys);

  createdDefaultKeys.map(async (key,index)  => {
      const keyValueData = {
          translation_key: key._id,
          value: `Hello World - ${index + 1}`,
          addedUser: userId,
          updatedUser: userId,
          language: "en"
      }
      await TranslationValue.create(keyValueData)
  })

}

module.exports = {
  createDefaultKeysAndValues
}