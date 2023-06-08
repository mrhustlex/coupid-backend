const express = require('express');
const router = express.Router();
const {
  createMerchant,
  getAllMerchants,
  getMerchantById,
  updateMerchant,
  deleteMerchant,
  getHotMerchants
} = require('../controllers/merchantController');

router.post('/', createMerchant);
router.get('/', getAllMerchants);
router.get('/hotmerchants', getHotMerchants);
router.get('/:id', getMerchantById);
router.put('/:id', updateMerchant);
router.delete('/:id', deleteMerchant);

module.exports = router;