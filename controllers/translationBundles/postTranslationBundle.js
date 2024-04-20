const { TranslationBundle } = require('../../models/translationBundle');

const postTranslationBundle = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      user: req.user.id,
    }
    const translationBundle = await TranslationBundle.create(payload);
    res.json(translationBundle);
  } catch (error) {
    next(error);
  }
}
module.exports = postTranslationBundle;