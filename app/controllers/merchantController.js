const {Merchant} = require('../models/product');

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
    //   console.log(merchants);
      res.json(merchants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async function getHotMerchants(req, res) {
    //get 10 random merchants
    try {
      const merchants = await Merchant.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 8
      });
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

module.exports = {
    createMerchant,
    getAllMerchants,
    getMerchantById,
    updateMerchant,
    deleteMerchant,
    getHotMerchants
};