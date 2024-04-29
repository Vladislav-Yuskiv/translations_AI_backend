const { TranslationBundle } = require('../../models/translationBundle');
const { createDefaultKeysAndValues } = require('../../utils');

const postTranslationBundle = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      users: [req.user.id],
      createdBy: req.user.id,
      translatedLanguages: ["en"]
    }

    const translationBundle = await TranslationBundle.create(payload);

    if(req.body.createKeys){
      await createDefaultKeysAndValues(translationBundle._id,req.user.id)
    }

    res.json({
      message:`${req.body.name} was successfully created`,
      bundle:translationBundle
    });
  } catch (error) {
    next(error);
  }
}
module.exports = postTranslationBundle;