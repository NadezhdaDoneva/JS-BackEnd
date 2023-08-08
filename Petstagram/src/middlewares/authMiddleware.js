const jwt = require('../lib/jwt');
const {secret, tokenKey} = require('../config/config')

exports.auth = async (req, res, next) => {
    const token = req.cookies[tokenKey];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, secret);
            
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (err) {
            res.clearCookie(tokenKey);

            res.redirect('/users/login');
        }
    } else {
        next();
    }
}

exports.isAuth = (req, res ,next) =>{
    if(!req.user){
        return res.redirect('/users/login');
    }

    next();
}