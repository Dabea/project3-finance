var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    product: {
		productName: {
			type: String,
			required: true
        },
        productStore: {
            type: String,
        },
        productDepartment: { 
            type: String
        }

        
	},
	transaction:{
        transactionDate:{
            type: Date,
            default: Date.now
        },
        transactionQuantity: {
            type: String
        },
        transactionTotal: {
            type: String,
        },
    }
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;