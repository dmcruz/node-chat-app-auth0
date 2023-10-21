const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const fs = require('fs')
const { auth } = require('express-openid-connect')
require('dotenv').config()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const server = http.createServer(app)
const io = socketio(server)

const router = require('./routes/index')

const port = process.env.PORT || 3001
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
app.use(express.json())

// auth
app.use(auth(config))

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

let count = 0
io.on('connection', (socket) => {
  console.log('new websocket connection')
  socket.emit('countUpdated', count)
  
  socket.broadcast.emit('chat-event', 'A new user has joined');

  socket.on('sendMessage', (message, username) => {
    io.emit('receiveMessage', message, username)
  })

  socket.on('disconnect', () => {
    io.emit('chat-event', 'A user has left')
  })
})
server.listen(port, ()=> {
  console.log('server running')
})