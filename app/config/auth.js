const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'localhost:3000/couponapp',
    issuerBaseURL: 'https://dev-32lxqsmlyr2lle1a.us.auth0.com/',
});
  
const checkScopes = requiredScopes('read:messages');

module.exports = {
    jwtCheck,
    checkScopes,
    // oAuthServer
};