const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const User = require('../models/users')
exports.secret_get = asyncHandler(async (req, res, next) => {
    res.render('enter-secret', {
        title: 'Member Check',
        user: req.user._id
    })
})
exports.secret_post = [
    body("secret", "Must enter the secret")
        .trim()
        .isLength({min: 5})
        .custom(value => {
            return value === process.env.MEMBERSECRET
        })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('enter-secret', {
               title: 'Member Check',
               error: errors.array()
            })
        } else {
            if (req.body.admin != undefined) {
                await User.findByIdAndUpdate(req.body.user, {isMember: true, isAdmin: true})
            } else {
                await User.findByIdAndUpdate(req.body.user, {isMember: true})
            }
            res.redirect('/')
        }
    })
]