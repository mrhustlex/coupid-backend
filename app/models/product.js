const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Product price must be greater than or equal to 0'
      }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'Product stock must be greater than or equal to 0'
      }
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  deliveryTime: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('available', 'out of stock'),
    allowNull: false,
    defaultValue: 'available'
 },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'product',
  timestamps: true
});

class ProductOffer extends Model {}

ProductOffer.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Product offer price must be greater than or equal to 0'
      }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: 'Product offer stock must be greater than or equal to 0'
      }
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull:false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'productOffer',
  timestamps: true
});

class Merchant extends Model {}

Merchant.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email address'
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'merchant',
  timestamps: true
});

//association 
ProductOffer.belongsTo(Product, {foreignKey: 'productId'});
Product.hasMany(ProductOffer, {foreignKey: 'productId'});
Product.belongsTo(Merchant, {foreignKey: 'merchantId'});
Merchant.hasMany(Product, {foreignKey: 'merchantId'});

// Export the model
module.exports = {
    Merchant,
    ProductOffer,
    Product
};