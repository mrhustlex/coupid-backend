const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const couponRoutes = require('./routes/couponRoute');
const dotenv = require('dotenv').config();
// const { auth } = require('express-openid-connect');
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
// const { requiresAuth } = require('express-openid-connect');

// const authConfig = {
//   audience: 'localhost:3000/couponapp',
//   authRequired: true,
//   auth0Logout: true,
//   secret: process.env.AUTH0_CLIENT_SECRET,
//   // baseURL: `http://${process.env.POD_IP}:80/callback`,
//   baseURL: process.env.AUTH0_CALLBACK_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_DOMAIN,
//   algorithms: ['RS256'],
// };

// // enforce on all endpoints
// app.use(auth(authConfig));
const jwtCheck = auth({
  audience: 'localhost:3000/couponapp',
  issuerBaseURL: 'https://dev-32lxqsmlyr2lle1a.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', (req, res) => {
  res.send('Home!')
})

// Middleware
app.use(bodyParser.json());

// Define middleware to handle authentication
// app.use(auth(authConfig));

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/coupon', couponRoutes);



// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});