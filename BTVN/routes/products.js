const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const authMiddleware = require("../middleware/authMiddware");

// API get all products
router.get("/", async function (req, res) {
    await Product.find().then((allProducts) => res.send(allProducts));
});

// API get product by ID
router.get("/:id", async function (req, res) {
    Product.findOne({ _id: req.params.id }).exec((err, product) => {
        if (err) {
            res.status(400).send("Couldn't find product");
        } else {
            res.json(product);
        }
    });
});

// API create a new product
router.post("/", authMiddleware, async function (req, res) {
    const newProduct = await Product();
    newProduct.p_name = req.body.p_name;
    newProduct.p_price = req.body.p_price;
    newProduct.p_amount = req.body.p_amount;

    try {
        const product = await newProduct.save();
        res.send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// API update product
router.put("/:id", authMiddleware, async function (req, res) {
    const productUpdate = req.body;
    await Product.findOne(
        { _id: req.params.id },
        { $set: productUpdate },
        { new: true, upsert: false },
        (err, product) => {
            if (err) {
                res.status(404).send("Couldn't find product");
            } else {
                res.send(product);
            }
        }
    );
});

// API delete product by ID
router.delete("/:id", authMiddleware, async function (req, res) {
    await Product.findByIdAndRemove({ _id: req.params.id })
        .then(function () {
            res.send("Successfully deleted product");
        })
        .catch((err) => {
            res.status(400).send("Could not delete product");
        });
});

module.exports = router;
