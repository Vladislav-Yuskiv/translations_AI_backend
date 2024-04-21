const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const deleteTranslationBundleId = async (req, res, next) => {
  try {
    const { translationBundleId } = req.params;

    if(!translationBundleId){
      throw new BadRequest("Invalid params")
    }

    await TranslationBundle.deleteOne({_id: translationBundleId});

    res.status(200).json({
      message: `Bundle was successfully deleted`,
    });

  } catch (error) {
    next(error);
  }
}
module.exports = deleteTranslationBundleId;