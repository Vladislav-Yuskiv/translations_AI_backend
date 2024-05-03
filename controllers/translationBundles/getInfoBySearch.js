const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const { TranslationKey, TranslationValue } = require('../../models');
const getInfoBySearch = async (req, res, next) => {
  try {
    const { translationBundleId, language } = req.params;

    const { value } = req.query;

    if(!translationBundleId){
      return new BadRequest("Invalid request")
    }

    let uniqueKeys = new Set();

    const keys = await TranslationKey.find({
      translationBundle: translationBundleId,
      $or: [
        { name: { $regex: value, $options: 'i' } },
        { description: { $regex: value, $options: 'i' } }
      ]
    });

    const keysMap = new Map(keys.map(key => [key._id.toString(), key]));
    const keysIds = keys.map(key => key._id)
    const matchValues = await TranslationValue.find({
      translation_key: { $in: keysIds },
      language: language,
    })


   const res1 =  matchValues.map(valueKey => {

      uniqueKeys.add(valueKey.translation_key.toString());

      return {
        key: valueKey.translation_key,
        name: keysMap.get(valueKey.translation_key.toString()).name,
        description:  keysMap.get(valueKey.translation_key.toString()).description,
        createdAt:  keysMap.get(valueKey.translation_key.toString()).createdAt,
        updatedAt:  keysMap.get(valueKey.translation_key.toString()).updatedAt,
        updatedBy:  keysMap.get(valueKey.translation_key.toString()).updatedBy,
        createdBy:  keysMap.get(valueKey.translation_key.toString()).createdBy,

        keyValueId: valueKey._id,
        keyValue: valueKey.value,
        valueCreatedAt: valueKey.createdAt,
        valueUpdatedAt: valueKey.updatedAt,
        valueAddedBy: valueKey.addedUser,
        valueUpdatedBy: valueKey.updatedUser
      }

    })


    //for values
    const values = await TranslationValue.find({
      language: language,
      $or: [
        { value: { $regex: value, $options: 'i' } }
      ]
    });

    const res2 = await Promise.all(values.map(async (valueKey) => {
      const key = await TranslationKey.findById(valueKey.translation_key);

      if (!uniqueKeys.has(valueKey.translation_key.toString()) && key.translationBundle.toString() === translationBundleId) {
        return {
          key: key._id,
          name: key.name,
          description: key.description,
          createdAt: key.createdAt,
          updatedAt: key.updatedAt,
          updatedBy: key.updatedBy,
          createdBy: key.createdBy,

          keyValueId: valueKey._id,
          keyValue: valueKey.value,
          valueCreatedAt: valueKey.createdAt,
          valueUpdatedAt: valueKey.updatedAt,
          valueAddedBy: valueKey.addedUser,
          valueUpdatedBy: valueKey.updatedUser
        };
      }
    }));

    const filteredRes2 = res2.filter(item => item !== undefined);
    res.status(200).json([...res1,...filteredRes2]);

  } catch (error) {
    next(error);
  }
}
module.exports = getInfoBySearch;