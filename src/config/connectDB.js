const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('d2uivc17a0acdt', 'okultaptlbfcuv', '7b6487c14595de4378b22bc964b8151be8e88c844670381b6558c206f3a9032a', {
  host: 'ec2-44-198-223-154.compute-1.amazonaws.com',
  dialect: 'postgres',
  logging: false,

  
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


module.exports = connectDB;