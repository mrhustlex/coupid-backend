const sequelize = require('./config/database');
const User = require('./models/user');
const Coupon = require('./models/coupon');
const faker = require('faker');

async function initializeDatabase() {
  try {
    // Synchronize the models with the database
    await sequelize.sync({ force: true });

    // Create 100 fake users
    const users = [];
    for (let i = 0; i < 100; i++) {
      const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(8)
      };
      users.push(user);
    }
    await User.bulkCreate(users);
    console.log('Users created successfully');

    // Create 100 fake coupons
    const coupons = [];
    for (let i = 0; i < 100; i++) {
      const coupon = {
        code: faker.random.alphaNumeric(8).toUpperCase(),
        discount: faker.random.number({ min: 10, max: 90 }),
        expirationDate: faker.date.future()
      };
      coupons.push(coupon);
    }
    await Coupon.bulkCreate(coupons);
    console.log('Coupons created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();