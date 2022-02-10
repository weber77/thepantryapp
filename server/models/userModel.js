const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now() },
    password: { type: String, required: true },
    name: { type: String },
    pantry: [
        { type: String }
    ],
    favouriteRecipes: [
        { type: String }
    ],
    madeRecipes: [
        { type: String }
    ]
});

module.exports = mongoose.model("user", userSchema);