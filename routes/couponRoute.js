const express = require('express');
const router = express.Router();
const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv').config();

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

const authConfig = auth({
    audience: 'localhost:3000/couponapp',
    issuerBaseURL: 'https://dev-32lxqsmlyr2lle1a.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
const authMiddleware = authConfig;


// Define routes for coupons
router.post('/create', createCoupon);
router.get('/list', listCoupon); // removed authMiddleware
router.post('/:code/use', useCoupon);
router.get('/:code', showCouponDetail);
router.post('/:code/archive', archiveCoupon);
router.put('/:code', modifyCoupon);
router.delete('/:code', deleteCoupon);
router.get('/:code/get', getCoupon);

module.exports = router;