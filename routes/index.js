var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')
const signUpControler = require("../controllers/sign-upController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members-Only' });
});

router.get('/login', loginController.loginGet)
router.post('/login', loginController.loginPost)
router.get('/signup', signUpControler.signUpGet)
router.post('/signup', signUpControler.signUpPost)

module.exports = router;
