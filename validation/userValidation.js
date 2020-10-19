// validation
const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  username: Joi.string().min(4).max(28).required(),
  email: Joi.string()
    .min(5)
    .max(320)
    .required()
    .email(),
  password: Joi.string().trim().min(6).max(256).required()
});

module.exports = function(data) {
    return userSchema.validate(data);
}
