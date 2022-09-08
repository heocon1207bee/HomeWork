const express = require('express')
const router = express.Router()
const {addNewProduct} = require('../controller/productController')

router.post('/', addNewProduct)

module.exports = router