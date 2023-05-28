const Coupon = require('../models/coupon');

// Define a function to create a new coupon
const createCoupon = async (req, res) => {
  const { code, discount, expirationDate } = req.body;
  console.log(req.body);
  try {
    const coupon = await Coupon.create({
      code,
      discount,
      expirationDate,
      createdBy: req.auth.payload.sub // Assuming you're using Auth0 and have a `sub` claim in the JWT
    });

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to list all coupons
const listCoupon = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // default to page 1 and limit 10
    const offset = (page - 1) * limit;

    const coupons = await Coupon.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit
    });

    const totalPages = Math.ceil(coupons.count / limit); // calculate total number of pages
    const currentPage = parseInt(page, 10); // convert page to integer

    // create pagination object
    const pagination = {
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      nextPage: currentPage + 1,
      previousPage: currentPage - 1
    };

    res.json({ coupons: coupons.rows, pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to use/scan a coupon
const useCoupon = async (req, res) => {
  const { code } = req.body;
  console.log("COde: "+code);
  console.log(req.params);
  try {
    const coupon = await Coupon.findOne({ where: { code } });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (coupon.isExpired) {
      return res.status(400).json({ error: 'Coupon has already expired' });
    }

    coupon.usedBy.push(req.auth.payload.sub); // Assuming you're using Auth0 and have a `sub` claim in the JWT
    await coupon.save();

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to show the details of a coupon
const showCouponDetail = async (req, res) => {
  const { code } = req.params;
  console.log(req.params);
  try {
    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to archive a listed coupon
const archiveCoupon = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  try {
    const [numUpdated, updatedCoupon] = await Coupon.update(
      { status: 'archived' },
      { where: { code }, returning: true }
    );
      console.log(updatedCoupon, numUpdated);
    if (numUpdated === 0) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json(updatedCoupon[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to modify a listed coupon
const modifyCoupon = async (req, res) => {
  // const {  } = req.params;
  const { code, discount } = req.body;

  try {
    const [numUpdated, updatedCoupon] = await Coupon.update(
      { discount },
      { where: { code }, returning: true }
    );

    if (numUpdated === 0) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json(updatedCoupon[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to delete a listed coupon
const deleteCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const numDeleted = await Coupon.destroy({ where: { code } });

    if (numDeleted === 0) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to list the hot deals coupons for top 8 discount
const listHotDealCoupon = async (req, res) => {
   try {
    const coupons = await Coupon.findAll({
      order: [['discount', 'DESC']],
      where: { hot_deal: 1 },
      limit: 8
    });

    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

module.exports = {
  createCoupon,
  listCoupon,
  useCoupon,
  showCouponDetail,
  archiveCoupon,
  modifyCoupon,
  deleteCoupon,
  listHotDealCoupon
};