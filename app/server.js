const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const couponRoutes = require('./routes/couponRoute');
const productRoutes = require('./routes/productRoute');
const merchantRoutes = require('./routes/merchantRoute');
const dotenv = require('dotenv').config();
const { jwtCheck, checkScopes } = require('./config/auth');
const axios = require('axios');
const cors = require('cors');

// not set the restriction to api cors yet
app.use(cors());
// const jwtCheck = auth({
//   audience: 'localhost:3000/couponapp',
//   issuerBaseURL: 'https://dev-32lxqsmlyr2lle1a.us.auth0.com/',
//   // tokenSigningAlg: 'RS256'
// });

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', (req, res) => {
  res.send('Home!')
})

app.use('/api/users', userRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/product', productRoutes);
app.use('/api/merchant', merchantRoutes);
// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', jwtCheck, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});


app.get('/api/private-scoped', jwtCheck, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


