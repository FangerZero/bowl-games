module.exports = (req, res, next) => {
    try {
        if (req.userData.admin) {
            next();
        } else {
            res.status(401).json({ message: "Authentication Failed." });
        }
    } catch (e) {
        res.status(401).json({ message: "Authentication Failed." });
    }
};
