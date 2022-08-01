const Joi = require("joi");
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        age: Joi.number().integer().min(0).required(),
        address: Joi.string().min(5).required(),
        gender: Joi.string()
            .regex(/^(male|female)$/)
            .required(),
        phone: Joi.string().min(9).max(12).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};
module.exports.loginValidation = loginValidation;
