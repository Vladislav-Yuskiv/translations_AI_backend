const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const updateTranslationBundleId = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params;

    const { payload } = req.body;

    if(!translationBundleId || !payload){
       throw new BadRequest("Invalid params")
    }

    const translationBundle = await TranslationBundle.findByIdAndUpdate(translationBundleId, { ...payload }, { new: true });

    res.status(200).json({
      message: `Bundle "${translationBundle.name}" was successfully updated`,
      translationBundle
    });

  } catch (error) {
    next(error);
  }
}
module.exports = updateTranslationBundleId;