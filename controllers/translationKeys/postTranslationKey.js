const { TranslationKey } = require('../../models/translationKey');

const postTranslationKey = async (req, res, next) => {
  try {
    const {companyId} = req.params;

    const payload = {
      name: req.body.name,
      description: req.body.description,
      company: companyId,
    }
    const translationKey = await TranslationKey.create(payload);
    res.json(translationKey);
  } catch (error) {
    next(error);
  }
}
module.exports = postTranslationKey;