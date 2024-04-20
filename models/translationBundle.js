const { Schema, model } = require('mongoose');
const Joi = require('joi');

const translationBundleSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ],
    description: {
      type: String,
      required: [true, 'Specify project description'],
    },
    category: {
      type: String,
      default: ""
    },
    apiKey: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaValidateTranslationBundle = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.string().required(),
})

const TranslationBundle = model('translationBundle', translationBundleSchema);

module.exports = {
  TranslationBundle: TranslationBundle,
  translationBundleSchema,
  schemaValidateTranslationBundle,
};
