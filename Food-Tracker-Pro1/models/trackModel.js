const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    foodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food-items",
        required: true
    },
    eatenDate: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    }

}, { timestamps: true })

const trackingModel = mongoose.model("food-trackings", trackSchema);

module.exports = trackingModel; 