// validation
const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(320)
    .required()
    .email(),
  password: Joi.string().trim().min(6).max(320).required()
});

module.exports = function(data) {
    return userSchema.validate(data);
}
