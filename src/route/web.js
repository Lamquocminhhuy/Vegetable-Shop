import express from "express";
import homeController from "../controllers/homeController"
import adminController from "../controllers/adminController"

let router = express.Router();

let initWebRoutes = (app) => {
    
    // Định nghĩa tất cả đường link .
    // Cơ chế: khi người dùng ấn vào 1 đường link thì express sẽ vào file này tìm đường link, nếu giống thì sẽ đi tiếp vào Controller

    router.get('/', homeController.getHomePage);
    
    router.get('/about', homeController.getAbout);

    router.get('/admin', adminController.getAdminPage);

    router.get('/admin-create-user', adminController.getAdminCreateUser);

    router.post('/admin-post-user', adminController.postAdminCreateUser)






    return app.use("/", router);
}


module.exports = initWebRoutes;