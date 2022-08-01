var express = require("express");
var router = express.Router();
const {
    registerValidation,
    loginValidation,
} = require("../validation/validate");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create API register a new member
router.post("/register", async function (req, res) {
    // Validate User
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Check email exist on database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email exist in database");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    // Create user
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.age = req.body.age;
    newUser.address = req.body.address;
    newUser.gender = req.body.gender;
    newUser.phone = req.body.phone;
    newUser.email = req.body.email;
    newUser.password = hashPassword;
    // catch error
    try {
        const user = await newUser.save();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});
// API login system
router.post("/login", async function (req, res) {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Verify email
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) {
        return res.status(400).send("User not found");
    }
    // Verify password
    const passLogin = await bcrypt.compare(
        req.body.password,
        userLogin.password
    );
    if (!passLogin) {
        return res.status(400).send("Password is incorrect");
    }
    // Generate token
    const token = jwt.sign({ _id: userLogin._id }, "this is a secret key");
    res.header("auth-token", token).send(token);
});

module.exports = router;
