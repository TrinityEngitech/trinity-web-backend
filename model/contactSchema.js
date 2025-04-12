const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

})

const admin = mongoose.model("Contact", ContactSchema)

module.exports = admin