const sequelize = require('./config/database');
const User = require('./models/user');
const Coupon = require('./models/coupon');
const { Merchant, ProductOffer, Product } = require('./models/product');
const faker = require('faker');

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: true });
    // await createUsers(100);
    // await createCoupons(1000);
    await createMerchants(10);
    const productOffers = await ProductOffer.findAll();
    console.log(productOffers);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function createUsers(num) {
  const users = [];
  for (let i = 0; i < num; i++) {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(8)
    };
    users.push(user);
  }
  await User.bulkCreate(users);
  console.log('Users created successfully');
}

async function createCoupons(num) {
  const coupons = [];
  for (let i = 0; i < num; i++) {
    const coupon = {
      title: "Fake title "+i,
      price: faker.datatype.number({ min: 10, max: 9000 }),
      code: faker.random.alphaNumeric(8).toUpperCase(),
      discount: faker.datatype.number({ min: 10, max: 90 }),
      expirationDate: faker.date.future(),
      hot_deal: faker.datatype.number({ min: 0, max: 1 })
    };
    coupons.push(coupon);
  }
  await Coupon.bulkCreate(coupons);
  console.log('Coupons created successfully');
}

async function createMerchants(num) {
  for (let i = 0; i < num; i++) {
    const merchant = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
    };
    try {
      // await Merchant.bulkCreate(merchants);
      const createdMerchant = await Merchant.create(merchant);
      const createdProduct = await createProducts(faker.random.number({ min: 5, max: 10 }), createdMerchant.id);
      console.log('Merchants created successfully');
    } catch (err) {
      console.error('Error creating merchants:', err);
    }
  }
  console.log('Merchants created successfully');
}

async function createProducts(num, merchantId) {
  try {
    for (let j = 0; j < num; j++) {
      const product = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.random.number({ min: 5, max: 100 }),
        stock: faker.random.number({ min: 10, max: 100 }),
        category: faker.commerce.department(),
        features: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        deliveryTime: faker.random.number({ min: 1, max: 14 }),
        status: 'available',
        merchantId: merchantId
      };
      const createdProduct = await Product.create(product);
      await createProductOfferings(faker.random.number({ min: 3, max: 5 }), createdProduct.id);
    }
    console.log(`Created ${num} products successfully for merchant with ID ${merchantId}`);
  } catch (err) {
    console.error(`Error creating products for merchant with ID ${merchantId}:`, err);
  }
}

async function createProductOfferings(num, productId) {
  try {
    for (let k = 0; k < num; k++) {
      const productOffer = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.random.number({ min: 1, max: 50 }),
        stock: faker.random.number({ min: 5, max: 20 }),
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        productId: productId
      };

      const createdProductOffer = await ProductOffer.create(productOffer);
      // console.log(createdProductOffer);
    }
    console.log(`Created ${num} product offerings successfully for product with ID ${productId}`);
    return productOfferings;
  } catch (err) {
    console.error(`Error creating product offerings for product with ID ${productId}:`, err);
  }
}


// Call the initializeDatabase function to start the initialization process
initializeDatabase();