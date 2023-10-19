const Joi = require("joi");

const signUpSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
});

exports.signUpSchema = signUpSchema;

const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.signInSchema = signInSchema;
