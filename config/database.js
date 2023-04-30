const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Sequelize } = require('sequelize');

let sequelize;

// function to testDBConnection
const testConnection = (sequelize) => {
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
}

//connect to coupid_dev if it is development env while coupid_production for production launch
if(process.env.ENVIRONMENT == 'production'){
  sequelize = new Sequelize(process.env.DB_NAME_DEV, process.env.DB_USER_DEV, process.env.DB_PASSWORD_DEV, {
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
  });
  testConnection(sequelize);
}else if(process.env.ENVIRONMENT == 'development'){
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  });
  testConnection(sequelize);
}else if(process.env.ENVIRONMENT == 'local'){
  sequelize = new Sequelize(process.env.DB_NAME_LOCAL, process.env.DB_USER_LOCAL, process.env.DB_PASSWORD_LOCAL, {
    host: process.env.DB_HOST_LOCAL,
    dialect: 'postgres',
  });
  testConnection(sequelize);
}else{
  console.log('No environment defined');
}

// check the enironment exist 
if(process.env.ENVIRONMENT == 'production' || process.env.ENVIRONMENT == 'development' || process.env.ENVIRONMENT == 'local'){
  console.log('Environment is defined');
  module.exports = sequelize;
}else{
  console.log('No environment defined, the sequelise could not be exported');
  console.log("The current env setting is " + process.env.ENVIRONMENT);
}