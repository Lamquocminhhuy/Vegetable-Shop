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

let getCustomerDetail = (customerId ) => {
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.Customer.findOne({   // Chờ t lấy thông tin hả chạy tiếp dòng khác :v
                where: { id: customerId }, raw:true
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }

        }catch(e){
            reject(e)
        }

    })
}

let updateCustomerInfor = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
           
                    message: 'Missing required parameter!'
                })
            }
            let user = await db.Customer.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                    user.fullname = data.fullname,
                    user.address = data.address,
                    user.gender = data.gender,
                    user.phonenumber = data.phonenumber,
                    await user.save();
            

                    resolve(user);
            } else {
                resolve({
                    message: 'User not found!'
                });
            }

        } catch (e) {
            reject(e)
        }
    })

}

let deleteCustomer = (customerId) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.Customer.findOne({
               where: {id: customerId} 
            })

            if(user){
                user.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    createNewCustomer : createNewCustomer,
    getCustomerDetail:getCustomerDetail,
    updateCustomerInfor:updateCustomerInfor,
    deleteCustomer:deleteCustomer
}