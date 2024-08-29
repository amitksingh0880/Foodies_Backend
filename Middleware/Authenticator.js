// Authenticator.js
const jwt = require('jsonwebtoken');

const Authenticator = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            message: "Token is not provided",
            status: 0
        });
    }
    jwt.verify(token, "Foodies", (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Token is not valid",
                status: 0
            });
        }
        req.body.user = decode.userId;
        next();
    });
};

module.exports = {
    Authenticator
};
