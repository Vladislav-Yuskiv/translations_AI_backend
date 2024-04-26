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
    translatedLanguages: [
      {
        type: String,
        required: true,
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
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
  category: Joi.string().required(),
  translatedLanguages: Joi.array().required(),
  createdBy: Joi.string().required(),
  users:  Joi.array().required(),
})

const TranslationBundle = model('translationBundle', translationBundleSchema);

module.exports = {
  TranslationBundle: TranslationBundle,
  translationBundleSchema,
  schemaValidateTranslationBundle,
};
