import express from "express";
import homeController from "../controllers/homeController"
import adminController from "../controllers/adminController"
import authentication from "../auth/authentication"
let router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



let initWebRoutes = (app) => {
    
    // Định nghĩa tất cả đường link .
    // Cơ chế: khi người dùng ấn vào 1 đường link thì express sẽ vào file này tìm đường link, nếu giống thì sẽ đi tiếp vào Controller

    router.get('/', homeController.getHomePage);
    
    // Admin
    router.get('/login', homeController.getLogin);

    router.get('/admin',authentication.handleAuthentication, adminController.getAdminPage);

    router.get('/admin-create-user', adminController.getAdminCreateUser);

    router.post('/admin-post-user', adminController.postAdminCreateUser);

    router.get('/customer-detail', adminController.getCustomerDetail);

    router.post('/update-customer-infor', adminController.updateCustomerInfor);

    router.post('/delete-customer', adminController.deleteCustomer);

    router.get('/product', adminController.getProduct);

    router.post('/create-product',upload.single('image'), adminController.createProduct);

    router.get('/product-detail', adminController.getProductDetail);

    router.post('/update-product', adminController.updateProduct);

    router.post('/delete-product', adminController.deleteProduct);

    router.post('/create-order-admin', adminController.createOrder);

    router.get('/delete-order', adminController.deleteOrder);

    router.get('/update-order', adminController.updateOrder);

    router.post('/update-order', adminController.updateOrderStatus);

    router.get('/delete-order-in-customer', adminController.deleteOrderInCustomer);
    

    

    // Home Page
    router.post('/login', adminController.handleLogin);

    router.post('/sign-up', homeController.handleSignUp);


    router.get('/sign-up', homeController.getSignUp);


  



    return app.use("/", router);
}


module.exports = initWebRoutes;