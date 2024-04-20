const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const referUserSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    translationBundle:{
      type: Schema.Types.ObjectId,
      required: [true, 'Specify related translation bundle'],
      ref: 'translationBundle',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaValidateReferUser = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  translationBundle: Joi.string().required(),
})

const ReferUser = model('referUser', referUserSchema);

module.exports = {
  ReferUser,
  schemaValidateReferUser,
};