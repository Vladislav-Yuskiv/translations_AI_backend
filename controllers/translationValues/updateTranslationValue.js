const { BadRequest } = require('http-errors');
const { TranslationValue } = require('../../models');

const updateTranslationValue = async (req, res, next) => {
  try {

    const { translationBundleId, translationValueId} = req.params;

    const { payload } = req.body;

    if(!translationBundleId || !translationValueId){
      return new BadRequest("Invalid params")
    }

    const translationKeyValue = await TranslationValue.findByIdAndUpdate(translationValueId, { ...payload }, { new: true });

    res.status(200).json({
      message: "Successfully updated",
      translationKeyValue
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateTranslationValue;
