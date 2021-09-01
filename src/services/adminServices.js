import db from '../models/index';






let createNewCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            // SEQUELIZE ORM
            await db.Customer.create({ 
                email: data.email,
                password: data.password,
                fullname: data.fullname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
            
               
            })
            resolve('Create new customer success')
            


        }catch(e){
            reject(e);
        }
    });
}


module.exports = {
    createNewCustomer : createNewCustomer
}