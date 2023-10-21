var express = require('express')
const socketio = require('socket.io')
const { requiresAuth } = require('express-openid-connect');
var router = express.Router()

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Auth0 Webapp sample Nodejs',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });
  
router.get('/profile', requiresAuth(), function (req, res, next) {
    res.render('profile', {
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        isAuthenticated: req.oidc.isAuthenticated(),
        title: 'Profile page'
    });
});

router.get('/chat', function (req, res, next) {
    res.render('chat', {
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        isAuthenticated: req.oidc.isAuthenticated(),
        title: 'Chat'
    });
})

// router.get("/callback", (req, res) => {
//     // req.isAuthenticated is provided from the auth router
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// })

module.exports = router;