const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myapp', 'myappuser', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;