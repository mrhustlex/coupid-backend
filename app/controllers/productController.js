const {ProductOffer, Product, Merchant } = require('../models/product');

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

async function updateProductOffer(req, res) {
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
      const { page = 1, limit = 12, category = null, status = null } = req.query;
      const offset = (page - 1) * limit;
      const where = {};
      if (category) {
        where.category = category;
      }
      if (status) {
        where.status = status;
      }
      const products = await Product.findAndCountAll({ limit, offset, where });
      const totalPages = Math.ceil(products.count / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      res.json({ products: products.rows, totalPages, hasNextPage, hasPrevPage });
    } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function getHotCategories(req, res) {
  try {
    const categories = await Product.findAll({
      attributes: ['category', [sequelize.fn('count', sequelize.col('id')), 'count']],
      group: ['category'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getHotProducts(req, res) {
  try {
    const { category = null, status = null } = req.query;
    const where = {};
    if (category) {
      where.category = category;
    }
    if (status) {
      where.status = status;
    }
    const products = await Product.findAll({ where, order: [['stock', 'DESC']], limit: 8 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
    createProductOffer,
    getAllProductOffers,
    getProductOfferById,
    updateProductOffer,
    deleteProductOffer,
    createProduct,
    getAllProducts,
    getHotProducts,
    getProductById,
    getHotCategories,
    updateProduct,
    deleteProduct
  };