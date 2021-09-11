import db from '../models/index';
import homeServices from '../services/homeServices'
import adminServices from '../services/adminServices'



let getHomePage = async (req, res) => {
    try {
        const products = await adminServices.getAllProduct(req.body)

        return res.render('homepage/homepage.ejs',{products:products})
    }
         
    catch (err) {
        console.log(err.message);
     }
}

let getSignUp = (req, res) => {
    return res.render('homepage/register.ejs', {error : ''})
}


let getLogin = (req, res) => {
    return res.render('homepage/login.ejs', {error : ''})
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