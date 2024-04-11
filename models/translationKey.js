const { Schema, model } = require('mongoose');
const Joi = require('joi');

const translationKeySchema = Schema(
  {
    keyName: {
      type: String,
      required: [true, 'Key name is required'],
    },
    keyDescription: {
      type: String,
      required: [true, 'Key description is required'],
    },
    company:{
      type: Schema.Types.ObjectId,
      required: [true, 'Specify related company'],
      ref: 'company',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaValidateTranslationKey = Joi.object({
  keyName: Joi.string().required(),
  keyDescription: Joi.string().required(),
  company: Joi.string().required(),
})

const TranslationKey = model('translationKey', translationKeySchema);

module.exports = {
  TranslationKey,
  translationKeySchema,
  schemaValidateTranslationKey,
};