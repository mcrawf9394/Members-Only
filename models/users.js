const { Schema, model } = require('mongoose')
const User = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true}
})
User.virtual('fullname').get(function () {
    return `${this.firstName} ${this.lastName}`
})
module.exports = model('User', User)