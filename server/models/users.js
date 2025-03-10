const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const User = mongoose.model("User", UsersSchema)
module.exports = User;      