const { Merchant, ProductOffer, Product } = require('../models/product');

// Merchant controller
async function createMerchant(req, res) {
  try {
    const merchant = await Merchant.create(req.body);
    res.status(201).json(merchant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllMerchants(req, res) {
  try {
    const merchants = await Merchant.findAll();
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMerchantById(req, res) {
  try {
    const merchant = await Merchant.findByPk(req.params.id);
    if (!merchant) {
      res.status(404).json({ message: 'Merchant not found' });
    } else {
      res.json(merchant);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateMerchant(req, res) {
  try {
    const merchant = await Merchant.findByPk(req.params.id);
    if (!merchant) {
      res.status(404).json({ message: 'Merchant not found' });
    } else {
      await merchant.update(req.body);
      res.json(merchant);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteMerchant(req, res) {
  try {
    const merchant = await Merchant.findByPk(req.params.id);
    if (!merchant) {
      res.status(404).json({ message: 'Merchant not found' });
    } else {
      await merchant.destroy();
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ProductOffer controller
async function createProductOffer(req, res) {
  try {
    const productOffer = await ProductOffer.create(req.body);
    res.status(201).json(productOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllProductOffers(req, res) {
  try {
    const productOffers = await ProductOffer.findAll();
    res.json(productOffers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProductOfferById(req, res) {
  try {
    const productOffer = await ProductOffer.findByPk(req.params.id);
    if (!productOffer) {
      res.status(404).json({ message: 'Product offer not found' });
    } else {
      res.json(productOffer);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

asyncfunction updateProductOffer(req, res) {
  try {
    const productOffer = await ProductOffer.findByPk(req.params.id);
    if (!productOffer) {
      res.status(404).json({ message: 'Product offer not found' });
    } else {
      await productOffer.update(req.body);
      res.json(productOffer);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProductOffer(req, res) {
  try {
    const productOffer = await ProductOffer.findByPk(req.params.id);
    if (!productOffer) {
      res.status(404).json({ message: 'Product offer not found' });
    } else {
      await productOffer.destroy();
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Product controller
async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll({ include: [ProductOffer, Merchant] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
 }

async function getProductById(req, res) {
  try {
    const product = await Product.findByPk(req.params.id, { include: [ProductOffer, Merchant] });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.update(req.body);
      res.json(product);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.destroy();
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createMerchant,
  getAllMerchants,
  getMerchantById,
  updateMerchant,
  deleteMerchant,
  createProductOffer,
  getAllProductOffers,
  getProductOfferById,
  updateProductOffer,
  deleteProductOffer,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};