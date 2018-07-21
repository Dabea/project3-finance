var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        },

    quantity: {
        type: String,
        default: 1
        },

    cost: {
        type: String,
        required: true
        },

    category: {
        type: String,
        required: true
        }
});

var productSchema = mongoose.Schema({

    items: [itemSchema], 

    date: {
        type: Date,
        default: Date.now
        },

    store: {
        type: String,
        },

    total: {
        type: String,
        required: true
        }, 
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;