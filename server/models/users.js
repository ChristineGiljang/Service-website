const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "https://placehold.co/80x80" }
})

const User = mongoose.model("User", UsersSchema)
module.exports = User;      