const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "https://placehold.co/80x80" },
    type: { type: String, required: true, enum: ["client", "worker"], default: "client" }, 
})

const User = mongoose.model("User", UsersSchema)
module.exports = User;      