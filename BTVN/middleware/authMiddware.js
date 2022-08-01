const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    // check token exist?
    if (!token) return res.status(401).send("Could not access");
    // check token correct or incorrect
    try {
        // verify token
        const checkToken = jwt.verify(token, "this is a secret key");
        req.user = checkToken;
        next();
    } catch (err) {
        return res.status(400).send("Token is incorrect - Permission denied");
    }
};
