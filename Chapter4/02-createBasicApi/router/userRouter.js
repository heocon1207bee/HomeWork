const express = require('express')
const userRouter = express.Router()

const users = [
    {
        id: 1,
        name: 'Nguyen Tuan Anh',
    }
]

userRouter.get('/', (req, res) => {
    res.send(users)
})

userRouter.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    }
    users.push(newUser)
    res.send(users)
})

userRouter.put('/', (req, res) => {
    users.map(data => {
        if(data.id === req.body.id) {
            data.name = req.body.name
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

module.exports = userRouter