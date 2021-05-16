const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required.",
    },
    seriousness: {
        type: String,
        required: "Seriousness is required.",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "User is required.",
    },
},
    {
        timestamps: true
    },
)

const Status = mongoose.model('Status', statusSchema)

module.exports = Status