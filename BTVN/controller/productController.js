// Viet cac ham xu ly logic

const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel')
const User = require('../models/userModel')

const addNewProduct = asyncHandler(async function (req, res) {
    const userID = req.body.user;
    const userExists = await User.findOne({id: userID})
    if(userExists) {
        const newProduct = await Product.create(req.body)
        if (newProduct) {
            res.status(200).json(JSON.stringify(newProduct))
        } else {
            res.status(400)
            throw new Error('User not found')
        }
    }
})

module.exports = {
    addNewProduct
}