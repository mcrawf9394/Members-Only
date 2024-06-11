var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const loginController = require('../controllers/loginController')
const signUpControler = require("../controllers/sign-upController")
const memberController = require('../controllers/memberController')
const messageController = require('../controllers/messageController')
const Message = require('../models/messages')

/* GET home page. */
router.get('/', asyncHandler(async function(req, res, next) {
  const allMessages = await Message.find().sort({_id: 1}).exec()
  if (req.user && allMessages.length > 0 && req.user.isMember === true && req.user.isAdmin === true) {
    res.render('index',{title: 'Members-Only', user: req.user.fullname, messages: allMessages, member: true, admin: true})
  } else if (req.user && req.user.isMember === true && req.user.isAdmin === true) {
    res.render('index',{title: 'Members-Only', user: req.user.fullname, member: true, admin: true})
  } else if (req.user && allMessages.length > 0 && req.user.isMember === true) {
    res.render('index',{title: 'Members-Only', user: req.user.fullname, messages: allMessages, member: true})
  } else if (req.user && allMessages.length > 0) {
    res.render('index',{title: 'Members-Only', user: req.user.fullname, messages: allMessages})
  } else if (req.user && req.user.isMember) {
    res.render('index', { title: 'Members-Only', user: req.user.fullname, member: true})
  } else if (req.user) {
    res.render('index', { title: 'Members-Only', user: req.user.fullname})
  } else if (allMessages.length > 0) {
    res.render('index', { title: 'Members-Only', messages: allMessages })
  } else {
    res.render('index', { title: 'Members-Only' })
  };
}));
router.post('/', asyncHandler(async function(req, res, next) {
  await Message.findByIdAndDelete(req.body.deletePost)
  const allMessages = await Message.find().sort({_id: 1}).exec()
  if (req.user && allMessages.length > 0 && req.user.isMember === true && req.user.isAdmin === true) {
    res.render('index',{title: 'Members-Only', user: req.user.fullname, messages: allMessages, member: true, admin: true})
  } else if (req.user && req.user.isMember === true && req.user.isAdmin === true) {
    res.render('index',{title: 'Members-Only', user: req.user.fullname, member: true, admin: true})
  }
}))
router.get('/logout', asyncHandler( async function (req, res, next) {
  req.logout((err) => {
    if (err) return next(err)
      res.redirect('/')
  })
}))
router.get('/login', loginController.loginGet)
router.post('/login', loginController.loginPost)
router.get('/signup', signUpControler.signUpGet)
router.post('/signup', signUpControler.signUpPost)
router.get('/enter-secret', memberController.secret_get)
router.post('/enter-secret', memberController.secret_post)
router.get('/create-post', messageController.messageGet)
router.post('/create-post', messageController.messagePost)

module.exports = router;
