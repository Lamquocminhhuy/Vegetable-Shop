import db from "../models/index";

let handleAuthentication = async (req,res, next) =>{
    console.log(req.cookies)
    if(!req.cookies.userId){
        res.redirect('/login')
        return;
    }
    let user = await db.User.findOne( {where: { id: req.cookies.userId }})

    if (!user){
        res.redirect('/login');
        return;
    }
    
   next();
 
}

module.exports = {
    handleAuthentication:handleAuthentication
}