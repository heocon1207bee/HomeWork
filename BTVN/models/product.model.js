const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    p_name: {
        required: true,
        type: String,
    },
    p_price: {
        required: true,
        type: Number,
    },
    p_amount: {
        required: true,
        type: Number,
    },
});

module.exports = mongoose.model("product", productSchema);
