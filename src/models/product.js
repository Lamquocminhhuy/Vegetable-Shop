'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })
      Product.belongsTo(models.Allcode, { foreignKey: 'productStatus', targetKey: 'keyMap', as: 'statusData' })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    productStatus: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};