import db from '../models/index';
import homeServices from '../services/homeServices'

import adminServices from '../services/adminServices'

let getHomePage = async (req, res) => {
        let product = await adminServices.getAllProduct()
        if(req.signedCookies.userId ){
            let user = await adminServices.getCustomerDetail(req.signedCookies.userId )
            return res.render('homepage/homepage.ejs', { product: product , user : user}) 
        }else{
            return res.render('homepage/homepage.ejs', { product: product , user : ''}) 
        }
}

let getSignUp = (req, res) => {
    return res.render('homepage/register.ejs', {error : ''})
}


let getLogin = (req, res) => {
    return res.render('homepage/login.ejs', {error : '', user : ''})
}


let handleSignUp = async (req, res) => {
    let message =  await homeServices.handleSignUp(req.body);
    console.log(message);
    if(message === 'Ok'){
        return res.redirect('/login');
    }else{
        return res.send('Create account failed');
    }

}



module.exports = {
    getHomePage: getHomePage,
    getLogin:getLogin,
    handleSignUp:handleSignUp,
    getSignUp:getSignUp,

}