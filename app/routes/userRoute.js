const express = require('express');
const router = express.Router();
const { createUser, loginUser, updateUser, deleteUser, readProfile, getUserInfo } = require('../controllers/userController');
const { requireAuth } = require('../controllers/authController');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/profile', requireAuth, readProfile);
router.put('/update', requireAuth, updateUser);
router.delete('/delete', requireAuth, deleteUser);
router.get('/', getUserInfo);

module.exports = router;
