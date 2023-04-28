const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const createToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const login = (req, res) => {
  const token = createToken(req.user);
  res.status(200).json({ token });
};

const logout = (req, res) => {
  // Perform any logout logic here, if necessary
  res.redirect('/');
};

module.exports = {
  authMiddleware,
  login,
  logout,
  requireAuth
};