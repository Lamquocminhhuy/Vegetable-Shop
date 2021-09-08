import db from '../models/index';
import homeServices from '../services/homeServices'



let getHomePage = async (req, res) => {
        return res.render('homepage/homepage.ejs') 
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