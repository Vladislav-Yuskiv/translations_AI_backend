const { Schema, model } = require('mongoose');
const Joi = require('joi');

const companySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    description: {
      type: String,
      required: [true, 'Specify project description'],
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaValidateCompany = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.string().required(),
})

const Company = model('company', companySchema);

module.exports = {
  Company,
  companySchema,
  schemaValidateCompany,
};
