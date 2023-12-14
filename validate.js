let Joi = require("joi");

module.exports.validateData = function (data) {
  let schema = Joi.object({
    username: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5).max(255),
  });
  let validation = schema.validate(data);
  return validation;
};

module.exports.validateLogin = (data) => {
  let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5).max(255),
  });
  let validation = schema.validate(data);
  return validation;
};

module.exports.validateTodo = (data) => {
  let schema = Joi.object({
    userid: Joi.allow(),
    todo: Joi.string(),
    status: Joi.boolean(),
  });
  let validation = schema.validate(data);
  return validation;
};
