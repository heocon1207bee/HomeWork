// Viet cac ham xu ly logic

// Goi den model de tuong tac voi database
// Duoc router goi den - de dinh tuyen nguoi dung den controller nao
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async function (req, res) {
    const {name, email, password, isAdmin} = req.body
    // 1. Check user co ton tai trong database
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // 2. Luu vao database
    const newUser = await User.create({name, email, password, isAdmin})
    if (newUser) {
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const authLogin = asyncHandler(async function (req, res) {
    // Xu ly code logic login
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

module.exports = {
    registerUser,
    authLogin
}