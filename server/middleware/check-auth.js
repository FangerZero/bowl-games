const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.AUTH_KEY);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId, admin: decodedToken.admin || false };
        next();
    } catch (e) {
        res.status(401).json({ message: "Authentication Failed." });
    }
};
