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
        

        let allorder = await adminServices.getAllOrder()

        // console.log(allorder)
        return res.render('admin/admin.ejs', {
            data : data ,
            allorder : allorder
        
        })

            
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
  

    return res.redirect('/admin');
}
 
let getCustomerDetail = async(req, res) => {
    let customerId  = req.query.id;
    let customer =  await adminServices.getCustomerDetail(customerId );
    let product = await adminServices.getAllProduct();
    let order = await adminServices.getOrderByCustomerId(customerId);
    // console.log(order)
    return res.render('admin/customerDetail.ejs', {
        customer : customer,
        product:product,
        order:order
    
    })
}

let updateCustomerInfor = async(req, res) => {
    let customer =  await adminServices.updateCustomerInfor(req.body);
    let product = await adminServices.getAllProduct();
    let order = await adminServices.getOrderByCustomerId(req.body.id);
    return res.render('admin/customerDetail.ejs', {customer : customer, product:product, order:order})
}


let deleteCustomer = async(req, res) => {
    let customerId =  await adminServices.deleteCustomer(req.body.id);
    
    return res.redirect('/admin');
}

let handleLogin = async (req,res) =>{

    let email = req.body.email;
    let password = req.body.password;



    let message = await adminServices.handleUserLogin(email, password);
    console.log(message);
    if(message.user){
        res.cookie('userId', message.user.id,{
            signed: true,
            
        })
    }

    if(message.check === 'Admin'){
        return res.redirect('/admin');
    }else if (message.check === 'User'){
        return res.redirect('/');
    }else if (message.errCode === 1){
        return res.render('homepage/login', {
            error : message.check,
            user : message.user,
        });
    }
 
   
    
}


let getProduct = async (req,res) =>{
  
    let price = await adminServices.getAllcode('PRICE');
    let size = await adminServices.getAllcode('SIZE');
    let product = await adminServices.getAllProduct();
    // console.log(price)
   
    return res.render('admin/product.ejs', {
        price: price,
      
        product:product,
        size:size,
    });
}

let createProduct = async (req,res) =>{
    let data = req.body;
    let image = req.file.buffer.toString('base64');
    let message = await adminServices.createProduct(data, image)

    if(message === 'Ok'){
        return res.redirect('/product');  
    }
}

let getProductDetail = async (req,res) =>{
    let product = await adminServices.getProductById(req.query.id)
    let price = await adminServices.getAllcode('PRICE');
    let size = await adminServices.getAllcode('SIZE');
    // console.log(price)
    return res.render('admin/productDetail', {
        product:product,
        price: price,
       
        size:size,

    });

}

let updateProduct = async (req,res) =>{

    let product = await adminServices.updateProduct(req.body)
    let price = await adminServices.getAllcode('PRICE');
    let size = await adminServices.getAllcode('SIZE');
    return res.render('admin/productDetail' , {
        product:product,
        price: price,
        size:size,

    
    });
}

let deleteProduct = async (req,res) =>{
    let message = await adminServices.deleteProduct(req.body.id)
    if (message === 'Ok'){
        return res.redirect('/product')
    }
}

let createOrder = async (req,res) =>{
    let userid = req.body.id;
    let message = await adminServices.createOrder(req.body)
    if (message === 'Ok'){
        return res.redirect('/customer-detail?id='+userid)
    }
}

let deleteOrder = async (req,res) =>{
    let message = await adminServices.deleteOrder(req.query.id)
    if (message === 'Ok'){
        return res.redirect('/admin')
    }
}

let updateOrder = async (req,res) =>{

  let order = await adminServices.getOrderById(req.query.id)
  let status = await adminServices.getAllcode('STATUS');
//   console.log(status)
    return res.render('admin/updateOrder' , {
        order : order,
        status:status

    
    });
}

let updateOrderStatus = async (req,res) =>{

    let message = await adminServices.updateOrderStatus(req.body)
    let id = req.body.customerId;
   
    return res.redirect('/customer-detail?id='+id )
    
  

    
  }
  
  let deleteOrderInCustomer = async (req,res) =>{
    let message = await adminServices.deleteOrder(req.query.id)
    let cusId = req.query.cusId;
    
    if (message === 'Ok'){
        return res.redirect('/customer-detail?id='+cusId)
    }
  }

  
  let getLogOut = async (req,res) =>{
    res.clearCookie('userId');
    return res.redirect('/')
    
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
    createProduct:createProduct,
    getProductDetail:getProductDetail,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct,
    createOrder:createOrder,
    deleteOrder:deleteOrder,
    updateOrder:updateOrder,
    updateOrderStatus:updateOrderStatus,
    deleteOrderInCustomer:deleteOrderInCustomer,
    getLogOut:getLogOut
    
   
    

}