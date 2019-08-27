const jwt = require('jsonwebtoken');
const secretKey = '720Qu9|&r)/(uCOq!m:P)z*9bDS,2)_qYbLTY7EkAQQk_7ipRWZ2UZIZ1fu_fMya5azU2xd4VTD_aN8JeLum43LfxGUZ2Ye_73ed4M4nA71$h_7E3DH!M70r4d4Y_t34(H4m4NT0715h_73EDH1mF0R41!7ET1m3_0UYiML6xfHuuQ_gMAjwz56ubcBYg_vqt3sZfrVsPeqce_p39AtSBlDzXMPiMywdI_C~aKo-|N8jBfsIC..}g^Qo1f.=eR<V';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId, admin: decodedToken.admin || false };
        next();
    } catch (e) {
        res.status(401).json({ message: "Authentication Failed." });
    }
};
