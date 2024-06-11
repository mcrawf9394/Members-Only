const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
exports.loginGet = asyncHandler(async (req, res, next) => {
    res.render('login', {
        title: "login"
    })
})
// exports.loginPost = [
//     passport.authenticate('local'),
//     {
//         successRedirect: "/",
//         failureRedirect: "/"
//     }
// ]