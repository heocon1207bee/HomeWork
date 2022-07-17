const express = require('express')
const Joi = require('joi')
const userRouter = express.Router()

const users = [
    {
        id: 1,
        name: 'Nguyen Tuan Anh',
        phoneNumber: '0987624352',
        email: 'nguyen@gmail.com',
        gender: 'male',
        age: 34,
    }
]

userRouter.get('/', (req, res) => {
    res.send(users)
})

userRouter.post('/', (req, res) => {
    const {error} = validateUser(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
    }
    users.push(newUser)
    res.send(users)
})

userRouter.put('/', (req, res) => {
    users.map((data, index) => {
        if (data.id === req.body.id) {
            users[index] = {...data, ...req.body}
        }
    })
    res.send(users)
})

userRouter.delete('/', (req, res) => {
    const newUser = users.filter(data => data.id != req.body.id)
    users.splice(0, users.length)
    users.push(...newUser)
    users.map((data, index) => {
        data.id = index + 1
    })
    res.send(users)
})

const validateUser = (users) => {
    const schema = Joi.object({
        name: Joi.string().min(15).regex(/^[a-zA-Z ]+$/).required(),
        phoneNumber: Joi.string().regex(/^[0-9]{10,12}$/).required(),
        email: Joi.string().email().required(),
        gender: Joi.string().regex(/^(male|female|unknown)$/).required(),
        age: Joi.number().integer().min(1).max(200)
    })
    return schema.validate(users)
}

module.exports = userRouter