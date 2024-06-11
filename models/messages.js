const { Schema, model} = require('mongoose')
const MessageSchema = new Schema ({
    user: {type: String, required: true},
    title: {type: String, required: true},
    message: {type: String, required: true}
})
module.exports = model("Message", MessageSchema)