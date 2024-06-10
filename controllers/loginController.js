const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
exports.loginGet = asyncHandler(async (req, res, next) => {

})
exports.loginPost = [
    passport.authenticate('local'),
    {
        successRedirect: "/",
        failureRedirect: "/"
    }
]