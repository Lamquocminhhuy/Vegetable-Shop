import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
require('dotenv').config();



let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

// config app
viewEngine(app);
initWebRoutes(app);

// connect database
connectDB();

let port = process.env.PORT || 8081;

app.listen(port, () => {
    //callback func
    console.log("Express is running on port : " +port)

});