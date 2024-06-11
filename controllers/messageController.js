const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Message = require('../models/messages')
exports.messageGet = asyncHandler(async (req, res, next) => {
    console.log()
    res.render('addmessage', {
        title: "Add Post",
        user: req.user.userName
    })
})
exports.messagePost = [
    body('title', 'Must include a title')
        .trim()
        .isLength({min: 1})
        .escape(),
    body('message', "Must include a message")
        .trim()
        .isLength({min: 1})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('addmessage', {
                title: "Add Post",
                user: req.body.user,
                errors: errors.array()
            })
        } else {
            const newMessage = new Message ({
                user: req.body.user,
                title: req.body.title,
                message: req.body.message
            })
            await newMessage.save()
            res.redirect('/')
        }
    })   
]