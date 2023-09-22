const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const ProductSchema = new mongoose.Schema({

    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
},
{timestamps: true,versionKey: false}
)

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;