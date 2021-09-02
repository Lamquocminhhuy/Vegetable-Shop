import db from '../models/index';
import adminServices from '../services/adminServices'

// Controller nhận dữ liệu từ View xong xử lí rồi trả về cho View (khúc xử lí viết bên services vì viết ở đây thì rườm ra lắm)

let getAdminPage = async (req, res) => {
    try {

        let data = await db.User.findAll(
            { 
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value'] },
                ],
                raw: true,
                nest: true
            }
        )
        console.log(data)
        return res.render('admin/admin.ejs', {data : data })

            
    }catch(e){
        console.log(e)
    }
  
}


let getAdminCreateUser = (req, res) => {
    return res.render('admin/createUser.ejs')
}


// View --> gui request Controller -- > SERVICE  --- > cONTROLLER -- > VIEW

let postAdminCreateUser = async (req, res) => {
    let message =  await adminServices.createNewCustomer(req.body);
    console.log(message)
    return res.redirect('/admin');
}
 
let getCustomerDetail = async(req, res) => {
    let customerId  = req.query.id;
    let customer =  await adminServices.getCustomerDetail(customerId );
    return res.render('admin/customerDetail.ejs', {customer : customer})
}

let updateCustomerInfor = async(req, res) => {
    let customer =  await adminServices.updateCustomerInfor(req.body);

    return res.render('admin/customerDetail.ejs', {customer : customer})
}


let deleteCustomer = async(req, res) => {
    let customerId =  await adminServices.deleteCustomer(req.body.id);
    
    return res.redirect('/admin');
}

let handleLogin = async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;

    let message = await adminServices.handleUserLogin(email, password)
    if(message === true){
        return res.redirect('/admin');
    }else{
        return res.redirect('/login');
    }
}


let getProduct = async (req,res) =>{
  
    let price = await adminServices.getAllcode('PRICE');
    let status = await adminServices.getAllcode('PSTATUS');
    let product = await adminServices.getAllProduct();
    // console.log(price)
    console.log(status)
    return res.render('admin/product', {
        price: price,
        status:status,
        product:product
    });
}

let createProduct = async (req,res) =>{



    let message = await adminServices.createProduct(req.body)
    return res.redirect('/product');
  
       
    
}

module.exports = {
    getAdminPage:getAdminPage,
    getAdminCreateUser:getAdminCreateUser,
    postAdminCreateUser:postAdminCreateUser,
    getCustomerDetail:getCustomerDetail,
    updateCustomerInfor:updateCustomerInfor,
    deleteCustomer:deleteCustomer,
    handleLogin:handleLogin,
    getProduct:getProduct,
    createProduct:createProduct

}