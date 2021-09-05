import db from "../models/index";

import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
      console.log(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewCustomer = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // SEQUELIZE ORM
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        fullname: data.fullname,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender,
        positionId: 'P2',
      });
      resolve("Create new customer success");
    } catch (e) {
      reject(e);
    }
  });
};

let getCustomerDetail = (customerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        // Chờ t lấy thông tin hả chạy tiếp dòng khác :v
        where: { id: customerId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateCustomerInfor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          message: "Missing required parameter!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        (user.fullname = data.fullname),
          (user.address = data.address),
          (user.gender = data.gender),
          (user.phonenumber = data.phonenumber),
          await user.save();

        resolve(user);
      } else {
        resolve({
          message: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCustomer = (customerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: customerId },
      });

      if (user) {
        user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exists

        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password"],
          raw: true,
        });
        console.log(user);

        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          console.log(check);
          resolve(check);
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllcode = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.Allcode.findAll({ where: { type: typeInput } });

        resolve(data);
        // console.log(data)
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        include: [
          { model: db.Allcode, as: "priceData", attributes: ["value"] },
          { model: db.Allcode, as: "sizeData", attributes: ["value"] },
        ],
        raw: true,
        nest: true,
      });

      resolve(data);
      console.log(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createProduct = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.findOrCreate({
        where: {
          name: data.name,
        },
        defaults: {
          name: data.name,
          description: data.description,
          priceId: data.priceId,
          amount: data.amount,
          size: data.size,
          image: image,
          
        },
     
      });
      resolve("Ok");
    } catch (e) {
      reject(e);
    }
  });
};

let getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findOne({
        where: { id: id },
        include: [
          { model: db.Allcode, as: "priceData", attributes: ["value"] },
          { model: db.Allcode, as: "sizeData", attributes: ["value"] },
        ],
        raw: true,
        nest: true,
      });
      console.log(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          message: "Missing required parameter!",
        });
      }
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (product) {
          product.name = data.name,
          product.description = data.description,
          product.priceId = data.priceId,
          product.productStatus = data.productStatus,
          product.amount = data.amount,
          product.size = data.size,
          await product.save();

          data = await db.Product.findOne({
            where: { id: data.id },
            include: [
              { model: db.Allcode, as: "priceData", attributes: ["value"] },
              { model: db.Allcode, as: "sizeData", attributes: ["value"] },
            ],
            raw: true,
            nest: true, 
        });

        resolve(data);
      } else {
        resolve({
          message: "Product not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: id },
      });

      if (product) {
        product.destroy();
      }
      resolve('Ok');
    } catch (e) {
      reject(e);
    }
  });
};

let createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
      try{
         
  
          await db.Order.create({ 
            customerId: data.id,
            productId: data.productId,
            quantity: data.quantity,
            status: 'S1',
          
             
          })
          let product = await db.Product.findOne({
            where: { id: data.productId },
            raw: false,
          });
    
          if (product) {
         
              product.amount = product.amount - data.quantity,
       
              await product.save();
    
  
          }
          resolve('Ok')
          


      }catch(e){
          console.log(e)
          reject(e);
      }
  });
}

let getOrderByCustomerId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findOne({
        where: { customerId: id },
        include: [
        
          { model: db.Allcode, as: "orderStatusData", attributes: ["value"] },
          { model: db.Product, as: "productData", attributes: ["name"] },
        ],
        raw: true,
        nest: true,
      });
      console.log(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};


let getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findAll({

        include: [
        
          { model: db.Allcode, as: "orderStatusData", attributes: ["value"] },
          { model: db.Product, as: "productData", attributes: ["name"] },
          { model: db.User, as: "customerData", attributes: ["fullname"] },
        ],
        raw: true,
        nest: true,
      });
      console.log(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: id },
      });

      if (order) {
        order.destroy();
      }
      resolve('Ok');
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findOne({
        where: { id: id },
        include: [
        
          { model: db.Allcode, as: "orderStatusData", attributes: ["value"] },
          { model: db.Product, as: "productData", attributes: ["name"] },
          { model: db.User, as: "customerData", attributes: ["fullname", "phonenumber", "address"] },
        ],
        raw: true,
        nest: true,
      });
      console.log(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};


let updateOrderStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (order) {
        order.status = data.status,
        
          await order.save();

          resolve({
            message: "Ok!",
          });
      } else {
        resolve({
          message: "Error!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewCustomer: createNewCustomer,
  getCustomerDetail: getCustomerDetail,
  updateCustomerInfor: updateCustomerInfor,
  deleteCustomer: deleteCustomer,
  handleUserLogin: handleUserLogin,
  getAllcode: getAllcode,
  createProduct: createProduct,
  getAllProduct: getAllProduct,
  getProductById: getProductById,
  updateProduct: updateProduct,
  deleteProduct:deleteProduct,
  createOrder:createOrder,
  getOrderByCustomerId:getOrderByCustomerId,
  getAllOrder:getAllOrder,
  deleteOrder:deleteOrder,
  getOrderById:getOrderById,
  updateOrderStatus:updateOrderStatus
};
