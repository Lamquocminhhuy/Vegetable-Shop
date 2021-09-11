import db from "../models/index";
let randomString = Math.random().toString(36).substring(2,9);

let signSession = (req, res, next) => {
    if (!req.signedCookies.sessionId){
        res.cookie('sessionId', randomString,{
            signed: true,
        })
    }
    next();
}

module.exports = {
    signSession:signSession
}