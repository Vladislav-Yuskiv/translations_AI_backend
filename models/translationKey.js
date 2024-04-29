const { Schema, model } = require('mongoose');
const Joi = require('joi');

const translationKeySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Key name is required'],
    },
    description: {
      type: String,
      required: [true, 'Key description is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    translationBundle:{
      type: Schema.Types.ObjectId,
      required: [true, 'Specify related translationBundle'],
      ref: 'translationBundle',
    },
  },
  { versionKey: false, timestamps: true },
);

translationKeySchema.index({ name: 1, translationBundle: 1 }, { unique: true });

const schemaValidateTranslationKey = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  updatedBy: Joi.string().required(),
  translationBundle: Joi.string().required(),
  createdBy: Joi.string().required(),
})

const TranslationKey = model('translationKey', translationKeySchema);

module.exports = {
  TranslationKey,
  translationKeySchema,
  schemaValidateTranslationKey,
};