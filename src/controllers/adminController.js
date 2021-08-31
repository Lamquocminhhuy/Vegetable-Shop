import db from '../models/index';
import adminServices from '../services/adminServices'

// Controller nhận dữ liệu từ View xong xử lí rồi trả về cho View (khúc xử lí viết bên services vì viết ở đây thì rườm ra lắm)

let getAdminPage = async (req, res) => {
    try {
        let data = await db.Customer.findAll()
        return res.render('admin.ejs', {data : data })
            
    }catch(e){
        console.log(e)
    }
  
}


let getAdminCreateUser = (req, res) => {
    return res.render('createUser.ejs')
}


let postAdminCreateUser = async (req, res) => {
    let message =  await adminServices.createNewCustomer(req.body);
    console.log(message)
    return res.redirect('/admin');
}
 



module.exports = {
    getAdminPage:getAdminPage,
    getAdminCreateUser:getAdminCreateUser,
    postAdminCreateUser:postAdminCreateUser
}