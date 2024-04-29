const { BadRequest } = require('http-errors');
const { TranslationKey } = require('../../models');

const updateKey = async (req, res, next) => {
  try {

    const { translationKeyId } = req.params;

    const { payload } = req.body;

    if(!translationKeyId){
      return new BadRequest("Invalid params")
    }

    const translationKey = await TranslationKey.findByIdAndUpdate(translationKeyId, { ...payload }, { new: true });

    res.status(200).json({
      message: "Successfully updated",
      translationKey
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateKey;
