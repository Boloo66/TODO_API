let jwt = require('jsonwebtoken');
let router = require('express').Router();

module.exports = function(req, res, next) {
    let token = req.header('auth-token');
    if(!token) return res.status(403).send("Access not permitted");

    try{
        let verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).send('Access denied | Bad Token');
    }
}