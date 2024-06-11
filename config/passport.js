const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const connection = process.env.MONGODB_URI
const users = require('../models/users')
const bcrypt = require('bcrypt')

const customFields = {
    username: 'username',
    password: 'password'
}
const verifyCallBack = (username, password, done) => {
    users.findOne({ username: username})
        .then ((user) => {
            if (!user) {return done(null, false)}
            const isValid = validPassword(password, user.hash, user.salt)
            if (isValid) {
                return done(null, user)
            }   else {
                return done(null, false)
            }
        })
        .catch((err) => {
            done(err)
        })
}

const strategy = new LocalStrategy(customFields, verifyCallBack)

passport.use(strategy)
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) =>   {
    users.findById(userId)
    .then((user) => {
        done(null, user)
    })
    .catch(err => done(err))
})