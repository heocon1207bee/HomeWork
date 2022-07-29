var express = require('express');
var router = express.Router();
const userModel = require('../models/users.model')

// Get all user in db
router.get('/', function (req, res) {
    const name = req.query.name
    userModel.find({ name: name }, function (err, users) {
        if (err) {
            res.send('An error occurred')
        } else {
            console.log('Successfully found user')
            res.json(users)
        }
    })
});

// Update user by ID
router.put('/UbID-:id', function (req, res) {
    userModel.findByIdAndUpdate({
        _id: req.params.id,
    },{
        $set: {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
        }
    }, function (err, user) {
        if (err) {
            res.send('An error occurred')
        } else {
            console.log('Successfully updated')
            res.json(user)
        }
    })
})

// Update user by phoneNumber
router.put('/UbPhone-:phoneNumber', function (req, res) {
    userModel.findOneAndUpdate({
            phoneNumber: req.params.phoneNumber
        }, {
            $set: {
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
            }
        }, function(err, user) {
            if (err) {
                res.send('An error occurred')
            } else {
                console.log('Successfully updated')
                res.json(user)
            }
        })
})

// Find and delete a user by ID
router.delete('/DbID-:id', function(req, res) {
    userModel.findByIdAndDelete({_id: req.params.id}, function(err, user) {
        if (err) {
            res.send('An error occurred')
        } else {
            console.log('Successfully deleted')
            res.json(user)
        }
    })
})

// Add  a new user
router.post('/', function (req, res) {
    const newUser = new userModel()
    newUser.name = req.body.name
    newUser.age = req.body.age
    newUser.address = req.body.address
    newUser.gender = req.body.gender
    newUser.phoneNumber = req.body.phoneNumber
    newUser.email = req.body.email

    newUser.save((err, user) => {
        if (err) {
            res.send('An error has occurred')
        } else {
            console.log('Successfully saved new user')
            res.send(user)
        }
    })
})

module.exports = router;
