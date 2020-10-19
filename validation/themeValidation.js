// validation
const Joi = require("@hapi/joi");

const hexRegex = /^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/i;

const colorsSchema = Joi.object({
  accentColor: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  accentColorSecondary: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  alertHoverColor: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  darkBg: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  iconColor: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  lighterBg: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  mainBg: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  navbarLogoBg: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  primaryText: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex),
  secondaryText: Joi.string()
    .required()
    .length(9)
    .regex(hexRegex)
});

const themeSchema = Joi.object({
  colors: colorsSchema,
  creator: Joi.string()
    .required()
    .trim()
    .min(1)
    .max(64),
  creatorId: Joi.string()
    .required()
    .length(36),
  description: Joi.string()
    .required()
    .trim()
    .min(8)
    .max(30),
  name: Joi.string()
    .required()
    .trim()
    .min(1)
    .max(64),
  type: Joi.string()
    .required()
    .valid("Dark", "Light")
});

module.exports = function(data) {
  return themeSchema.validateAsync(data);
};
