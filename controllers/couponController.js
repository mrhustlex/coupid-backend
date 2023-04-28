const Coupon = require('../models/coupon');

// Define a function to create a new coupon
const createCoupon = async (req, res) => {
  const { code, discount } = req.body;

  // Check if req.user is defined
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const coupon = await Coupon.create({
      code,
      discount,
      createdBy: req.user.sub // Assuming you're using Auth0 and have a `sub` claim in the JWT
    });

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to list all coupons
const listCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });

    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to use/scan a coupon
const useCoupon = async (req, res) => {
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (coupon.isExpired) {
      return res.status(400).json({ error: 'Coupon has already expired' });
    }

    coupon.usedBy.push(req.user.sub); // Assuming you're using Auth0 and have a `sub` claim in the JWT
    await coupon.save();

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to show the details of a coupon
const showCouponDetail = async (req, res) => {
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOne({ code });

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
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOneAndUpdate(
      { code },
      { isArchived: true },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to modify a listed coupon
const modifyCoupon = async (req, res) => {
  const { code } = req.params;
  const { discount } = req.body;

  try {
    const coupon = await Coupon.findOneAndUpdate(
      { code },
      { discount },
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to delete a listed coupon
const deleteCoupon = async (req, res) => {
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOneAndDelete({ code });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define a function to get a coupon by code
const getCoupon = async (req, res) => {
  const { code } = req.params;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCoupon,
  listCoupon,
  useCoupon,
  showCouponDetail,
  archiveCoupon,
  modifyCoupon,
  deleteCoupon,
  getCoupon
};