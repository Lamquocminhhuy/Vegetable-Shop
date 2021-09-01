import db from '../models/index';




let getHomePage = async (req, res) => {
   
        return res.render('homepage.ejs')
            
  
}



let getAbout = (req, res) => {
    return res.render('test/about.ejs')
}






module.exports = {
    getHomePage: getHomePage,
    getAbout:getAbout,

}