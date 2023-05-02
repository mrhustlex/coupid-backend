const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the schema for the Coupon model
class Coupon extends Model {}

Coupon.init({
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "This coupon code already exists"
    }
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Discount must be greater than or equal to 0'
      },
      max: {
        args: [100],
        msg: 'Discount must be less than or equal to 100'
      }
    }
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('active', 'archived', 'deleted'),
    allowNull: false,
    defaultValue: 'active'
  },
  usedBy: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  }
},{
  sequelize,
  modelName: 'coupon',
  timestamps: true
});

// Export the model
module.exports = Coupon;