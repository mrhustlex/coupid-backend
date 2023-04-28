const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the schema for the Coupon model
class Coupon extends Model {}

Coupon.init({
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'archived'),
    allowNull: false,
    defaultValue: 'active'
  }
}, {
  sequelize,
  modelName: 'coupon',
  timestamps: true
});

// Export the model
module.exports = Coupon;