import express from "express";
import homeController from "../controllers/homeController"
import adminController from "../controllers/adminController"

let router = express.Router();

let initWebRoutes = (app) => {
 

    router.get('/', homeController.getHomePage);
    
    router.get('/about', homeController.getAbout);

    router.get('/admin', adminController.getAdminPage)






    return app.use("/", router);
}


module.exports = initWebRoutes;