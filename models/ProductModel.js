const mongoose = require('mongoose');



const ProductSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    product_img: {
        type: String,
    },
    createdAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }



})


const Product = mongoose.model('Product', ProductSchema)

module.exports = Product