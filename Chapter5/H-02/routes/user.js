const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', function (req, res) {
    const {error} = validateUser(req.body)
    if (error) {
        return res.status(400, error.details[0].message).send(`<h1>${error.details[0].message}</h1>`)
    }
    const {body} = req
    console.log(body)
    res.render('userInfo', {body})
})

const validateUser = function (obj) {
    const schema = Joi.object({
        ftName: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
        ltName: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
        birthDay: Joi.number().integer().required(),
        gender: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().regex(/^(\+[0-9]{10,12})/).required(),
        subject: Joi.any()
    })
    return schema.validate(obj)
}

module.exports = router;