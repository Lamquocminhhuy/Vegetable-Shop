import express from "express";
import homeController from "../controllers/homeController"
import adminController from "../controllers/adminController"

let router = express.Router();

let initWebRoutes = (app) => {
 

    router.get('/', homeController.getHomePage);
    
    router.get('/about', homeController.getAbout);

    router.get('/admin', adminController.getAdminPage);

    router.get('/admin-create-user', adminController.getAdminCreateUser);

    router.post('/admin-post-user', adminController.postAdminCreateUser)






    return app.use("/", router);
}


module.exports = initWebRoutes;