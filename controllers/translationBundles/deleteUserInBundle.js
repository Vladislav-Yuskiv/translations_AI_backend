const { TranslationBundle } = require('../../models/translationBundle');
const { BadRequest } = require('http-errors');
const deleteUserInBundle = async (req, res, next) => {
  try {
    const { translationBundleId , userId } = req.params;

    if(!translationBundleId || !userId){
      throw new BadRequest("Invalid params")
    }

    await TranslationBundle.findByIdAndUpdate(
      translationBundleId,
      { $pull: { users: userId } },
      { new: true }
    );

    res.status(200).json({
      message: `User was successfully removed`,
      userId: userId
    });

  } catch (error) {
    next(error);
  }
}
module.exports = deleteUserInBundle;