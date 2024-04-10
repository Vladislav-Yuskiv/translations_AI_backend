const { Schema, model } = require('mongoose');
const Joi = require('joi');

const translationValueSchema = Schema(
  {
    value: {
      type: String,
      required: [true, 'Key name is required'],
    },
    language: {
      type: String,
      required: [true, 'Key description is required'],
    },
    translation_key:{
      type: Schema.Types.ObjectId,
      required: [true, 'Specify translation_key'],
      ref: 'translationKey',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaValidateTranslationValue = Joi.object({
  value: Joi.string().required(),
  language: Joi.string().required(),
  translation_key: Joi.string().required(),
})

const TranslationValue = model('translationValue', translationValueSchema);

module.exports = {
  TranslationValue,
  translationValueSchema,
  schemaValidateTranslationValue,
};