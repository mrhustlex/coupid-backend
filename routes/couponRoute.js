const express = require('express');
const router = express.Router();
const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv').config();
const { jwtCheck} = require('../config/auth');

const {
  createCoupon,
  listCoupon,
  useCoupon,
  showCouponDetail,
  archiveCoupon,
  modifyCoupon,
  deleteCoupon,
  getCoupon
} = require('../controllers/couponController');

// Define routes for coupons
router.post('/create', jwtCheck, createCoupon);
router.get('/list', listCoupon); // removed authMiddleware
router.post('/:code/use', useCoupon);
router.get('/:code', showCouponDetail);
router.post('/:code/archive', archiveCoupon);
router.put('/:code', modifyCoupon);
router.delete('/:code', deleteCoupon);
router.get('/:code/get', getCoupon);

module.exports = router;