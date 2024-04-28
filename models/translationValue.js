const { Schema, model } = require('mongoose');
const Joi = require('joi');

const translationValueSchema = Schema(
  {
    value: {
      type: String,
    },
    language: {
      type: String,
      required: [true, 'Key description is required'],
    },
    addedUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    updatedUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
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
  value: Joi.string().optional(),
  language: Joi.string().required(),
  updatedUser: Joi.string().required(),
  addedUser: Joi.string().required(),
  translation_key: Joi.string().required(),
})

const TranslationValue = model('translationValue', translationValueSchema);

module.exports = {
  TranslationValue,
  translationValueSchema,
  schemaValidateTranslationValue,
};