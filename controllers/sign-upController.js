const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/users')
exports.signUpGet = asyncHandler(async (req, res, next) => {
    res.render('sign-up', {
        title: 'SignUp'
    })
})
exports.signUpPost = [
    body('firstName', "Must provide a first name")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("lastName", "Must include last name")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("username", "Must provide a Username")
        .trim()
        .isLength({min: 1})
        .custom(async value => {
            const user = await User.findOne({userName: value})
            if (user) {
                throw new Error('User Name is already in use')
            } 
        })
        .escape(),
    body("password", "Must include a password")
        .trim()
        .isLength({min: 8, max: 16})
        .escape(),
    body("confirm", "Must Confirm Password")
        .trim()
        .isLength({min: 8, max: 16})
        .custom(async (value, {req}) => {
            return value === req.body.password
        })
        .escape(),
    asyncHandler (async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.render('sign-up', {
                title: "SignUp",
                errors: errors
            })
        } else {
            let salt = bcrypt.genSaltSync(10)
            let hashedPassword = bcrypt.hashSync(req.body.password, salt)
            let newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.username,
                password: hashedPassword,
                salt: salt
            })
            await newUser.save()
            res.redirect('/login')
        }
    })
]