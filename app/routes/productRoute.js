const express = require('express');
const router = express.Router();
const {
  createProductOffer,
  getAllProductOffers,
  getProductOfferById,
  updateProductOffer,
  deleteProductOffer,
  createProduct,
  getAllProducts,
  getProductById,
  getHotCategories,
  getHotProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.post('/offer', createProductOffer);
router.get('/offer', getAllProductOffers);
router.get('/offer/:id', getProductOfferById);
router.put('/offer/:id', updateProductOffer);
router.delete('/offer/:id', deleteProductOffer);

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/hotcategories', getHotCategories);
router.get('/hotproducts', getHotProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;