const sequelize = require('./config/database');
const User = require('./models/user');
const Coupon = require('./models/coupon');

async function initializeDatabase() {
  try {
    // Synchronize the models with the database
    await sequelize.sync({ force: true });

    // Create initial data
    const user = await User.create({ name: 'John Doe', email: 'johndoe@example.com', password: 'password123' });
    console.log('User created successfully:', user.toJSON());

    const coupon = await Coupon.create({ code: 'SALE50', discount: 50, expirationDate: new Date('2023-05-01') });
    console.log('Coupon created successfully:', coupon.toJSON());
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();