const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Your name is required'],
    },
    accessLevel: {
      type: String,
      default: 'restricted',
    },
  },
  { versionKey: false, timestamps: true },
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  translationBundleId: Joi.string().optional()
});

const joiChangePasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  newPassword: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const User = model('user', userSchema);

module.exports = {
  User: User,
  joiRegisterSchema,
  joiLoginSchema,
  joiChangePasswordSchema
};
